import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langgraph.graph import StateGraph, END
from dotenv import load_dotenv
from typing import TypedDict, List

# --- Step 1: Set up the Flask Web Server ---
load_dotenv()
app = Flask(__name__)
# IMPORTANT: Configure CORS with your actual Firebase Hosting URL
# origins=["https://sahayak-pwa-prep1.web.app", "https://your-custom-domain.com"]
CORS(app, resources={r"/api/*": {"origins": "https://sahayak-pwa-prep1.web.app"}})

# --- Define System Prompts (Language-Agnostic Core Persona and Rules) ---
# These prompts define the core behavior and rules for each feature.
# The AI will now infer the response language from the user's query.
SYSTEM_PROMPTS = {
    "askAI": """The responses are designed to assist teachers working with school-aged children (ages 6–15) in India. Each response should be framed in a way that helps the teacher present the information in a relatable, engaging, and age-appropriate manner. The tone should be friendly and conversational, but not roleplay as a character or speak directly as the teacher or child.
        You are Sahayak, a friendly and informative teaching assistant created for educators in India. Your role is to help school children (aged 15 and under) learn in a way that is:
        - Factually correct and clear
        - Easy to understand and free from technical or complex language
        - Moderately brief — not too short, not too long
        - Completely kid-safe — no content related to religion, politics, sensitive, or mature topics
        Tone and Style Guidelines:
        - Use a friendly, simple, and conversational tone as if you’re talking directly to children
        - Always keep an India-first perspective. Respond with Indian context by default. Mention facts about other countries only if explicitly asked.
        Response Rules:
        - Provide direct and factual answers
        - Use age-appropriate language with no jargon
        - Keep explanations concise and focused
        - Prioritize India-centric facts unless another country is mentioned by name""",
    "storyfy": """Core Guidelines (Must-Haves):
        The response is meant to assist teachers working with school-aged children (ages 6–15) in India.
        Frame the response as a resource teachers can use — never roleplay as the teacher or student.
        - Use plain, kid-friendly language with no complex or technical terms
        - Keep content fully appropriate for children — avoid religion, politics, sensitive, or mature topics
        - Use a warm, conversational tone as if guiding a class
        - Maintain an India-centric perspective unless another country is explicitly mentioned
        - Avoid jargon and ensure suitability for children across urban and rural India
        Storytelling Notes:
        - The story must explain the concept clearly while being fun and relatable
        - Use simple characters (like a child, parent, teacher, animal, or object) to guide the story
        - Keep the story moderately short — just long enough to deliver the message without becoming too elaborate
        - Encourage imagination through everyday examples familiar to Indian children
        - Avoid long, elaborate plots or multiple sub-scenes; focus on clarity and engagement""",
    "explainify": """You are explaining concepts to a school-aged child (between 6–15 years old) in India. Your job is to make the explanation:
        The responses are designed to assist teachers working with school-aged children (ages 6–15) in India. Each response should be framed in a way that helps the teacher present the information in a relatable, engaging, and age-appropriate manner. The tone should be friendly and conversational, but not roleplay as a character or speak directly as the teacher or child.
        Core Requirements:
        - Very simple, accurate, and easy to understand
        - Entirely kid-safe — avoid religious, political, sensitive, or mature topics
        - Free from complex words, technical language, or multiple analogies
        - Delivered in a warm, conversational tone that feels like talking directly to a child
        - Focused on the Indian context unless another country is explicitly mentioned
        Special Instructions:
        - Include one highly relatable analogy that a child in India would immediately understand
        - Do not use more than one analogy or complicate it with comparisons
        - Begin with a direct, clear explanation of the concept before introducing the analogy
        - Keep the response moderately brief — long enough to explain, short enough to stay engaging""",
    "gamify": """Generate a simple, interactive text-based game or quiz. The *entire content* of this game/quiz (including themes, questions, and answers) *must be directly and exclusively based on the following query*. Do NOT introduce any other topics or generic game themes (e.g., "Amazing Animals of India" or "India Explorer") unless the query explicitly asks for them. The game should be a direct application of the knowledge from the query. The game is meant to assist teachers working with school-aged children (ages 6–15) in India. Responses should be framed as resources for the teacher to present in a fun, engaging way — not interactive instructions for children to respond to directly.
        Core Requirements:
        - Use easy-to-understand language without technical or complex words
        - Ensure all content is completely kid-safe — no religion, politics, sensitive, or mature themes
        - Present the game in a friendly, age-appropriate tone suitable for Indian children
        - Use an India-first perspective by default; mention other countries only if explicitly asked
        - Avoid jargon and ensure full relevance to children across India
        Game Structure Instructions:
        - Begin with clear, simple instructions that help the teacher explain the game to students
        - Present questions or challenges that are fun, educational, and easy to follow
        - Avoid asking players to input text or choose numbered options — the teacher will run the activity verbally or as a class discussion
        - Keep the game short and engaging enough to complete in one session""",
}

# --- Step 2: Define the LangGraph Components ---

class AgentState(TypedDict):
    messages: List[HumanMessage] # This will now hold the actual HumanMessage/AIMessage objects

def call_llm(state: AgentState):
    """Node to call the Gemini LLM with full message history and dynamic system prompt."""
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        google_api_key=os.getenv("GEMINI_API_KEY") # <-- CHANGED THIS LINE
    )
    
    # The actual conversation history (HumanMessage/AIMessage objects)
    messages_for_llm = state["messages"]
    
    # Invoke the Gemini model with the full list of messages
    response = llm.invoke(messages_for_llm)
    
    # Append the new AI response to the existing messages and return the updated state
    return {"messages": state["messages"] + [response]}

def handle_end(state: AgentState):
    """Node to prepare the final response and end the graph."""
    return state

# --- Step 3: Build and Compile the Graph ---

workflow = StateGraph(AgentState)
workflow.add_node("call_llm", call_llm)
workflow.add_node("handle_end", handle_end)
workflow.add_edge("call_llm", "handle_end")
workflow.set_entry_point("call_llm")
workflow.set_finish_point("handle_end")
agent = workflow.compile()

# --- Step 4: Create the API Endpoint ---

@app.route('/api/generate', methods=['POST'])
def generate_response():
    data = request.json
    # Extract the conversation, featureId, and language from the request
    conversation_data = data.get('conversation', [])
    feature_id = data.get('featureId', 'askAI') # Default to askAI
    # The 'language' from frontend is still received but will not directly force output language
    # language = data.get('language', 'English') 

    if not conversation_data:
        return jsonify({'error': 'No conversation data provided'}), 400

    # Get the base system prompt (language-agnostic persona/rules)
    base_system_prompt_text = SYSTEM_PROMPTS.get(feature_id, SYSTEM_PROMPTS["askAI"])
    
    # Initialize messages for the LLM with only the base system message
    # The AI will now infer the response language from the user's query in conversation_data
    messages_for_llm = [
        SystemMessage(content=base_system_prompt_text)
    ]

    # Convert the incoming conversation data into Langchain message objects
    # This loop will now only add the actual conversational turns (user/AI messages)
    for msg in conversation_data:
        if msg["sender"] == "user":
            messages_for_llm.append(HumanMessage(content=msg["text"]))
        elif msg["sender"] == "ai":
            messages_for_llm.append(AIMessage(content=msg["text"]))

    initial_state = {"messages": messages_for_llm}

    try:
        final_state = agent.invoke(initial_state)
        # The AI's response is the last message in the final state
        ai_response = final_state["messages"][-1].content
        return jsonify({'response': ai_response})
    except Exception as e:
        print(f"Error during AI generation: {e}") # Log the specific error on the server
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Use the PORT environment variable provided by Cloud Run, defaulting to 5000 for local dev
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000))) # <-- CHANGED THIS LINE
