// src/services/aiService.js

// This function will now make a web request to our new backend.
// It accepts the full conversation history, feature ID, and language.

// IMPORTANT: This URL points to your deployed Flask backend on Google Cloud Run.
const FLASK_BACKEND_URL = "https://sahayak-backend-480080327621.asia-south1.run.app"; // <-- UPDATED THIS URL TO YOUR DEPLOYED BACKEND

export const callGeminiApi = async (conversation, featureId = 'askAI', language = 'English') => {
  // We'll use the 'fetch' API to send a request to our new backend server.
  try {
    const response = await fetch(`${FLASK_BACKEND_URL}/api/generate`, { // Call your Flask backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // We send the entire conversation, featureId, and language to the backend.
      // The backend will use these to construct the full prompt including system instructions.
      body: JSON.stringify({
        conversation: conversation, // Pass the full conversation array
        featureId: featureId,
        language: language
      }),
    });

    // Check if the server's response was successful
    if (!response.ok) {
      // If the server sends an error, we'll throw an error here.
      const errorData = await response.json();
      throw new Error(errorData.error || 'Something went wrong on the server.');
    }

    // The server will send back a JSON response. We parse it here.
    const data = await response.json();
    
    // The final response from our AI agent is in the 'response' field of the JSON.
    return data.response;

  } catch (error) {
    console.error('Error calling AI service:', error);
    // Return a user-friendly error message if something goes wrong.
    throw new Error("I'm sorry, I'm having trouble with that request. Please try again in a moment.");
  }
};
