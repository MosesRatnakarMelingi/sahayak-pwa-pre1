// src/services/aiService.js

/**
 * Calls the Google Gemini API to generate content based on a prompt or conversation history.
 * @param {string|Array<Object>} content The text prompt (string) or conversation history (array of message objects).
 * @param {string} [initialInstruction=''] An optional initial instruction/system prompt for the model, applied only to the first user turn.
 * @returns {Promise<string>} A promise that resolves with the AI-generated text response.
 * @throws {Error} If the API call fails or returns an unexpected response.
 */
export async function callGeminiApi(content, initialInstruction = '') {
    let payload;

    // Check if the content is an array (conversation history) or a string (single prompt)
    if (Array.isArray(content)) {
        // If it's an array, use it directly as contents
        // If there's an initial instruction and it's the very first user message, prepend it
        if (initialInstruction && content.length > 0 && content[0].role === 'user') {
            const firstUserMessageText = content[0].parts[0].text;
            // Create a new array to avoid direct modification of the original history object in state
            const modifiedContent = [...content];
            modifiedContent[0] = {
                ...modifiedContent[0],
                parts: [{ text: initialInstruction + firstUserMessageText }]
            };
            payload = { contents: modifiedContent };
        } else {
            payload = { contents: content };
        }
    } else {
        // If it's a string, wrap it in the standard user message format
        // Prepend initial instruction if provided
        const textContent = initialInstruction ? initialInstruction + content : content;
        payload = { contents: [{ role: "user", parts: [{ text: textContent }] }] };
    }

    // IMPORTANT: For local development, ensure REACT_APP_GEMINI_API_KEY is defined in your .env file.
    // For deployment in the Canvas environment, the API key will be automatically provided.
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error Response:", errorData);
            // Propagate the specific error message from the API for better debugging
            throw new Error(`API request failed with status ${response.status}: ${errorData.error.message || 'Unknown error'}`);
        }

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            return result.candidates[0].content.parts[0].text;
        } else {
            console.error("Unexpected AI response structure:", result);
            throw new Error("Unexpected response structure from AI. Please try again.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error(`Could not generate content: ${error.message}`);
    }
}
