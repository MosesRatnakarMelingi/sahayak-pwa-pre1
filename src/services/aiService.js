// src/services/aiService.js

/**
 * Calls the Google Gemini API to generate content based on a prompt.
 * @param {string} prompt The text prompt to send to the AI model.
 * @returns {Promise<string>} A promise that resolves with the AI-generated text response.
 * @throws {Error} If the API call fails or returns an unexpected response.
 */
export async function callGeminiApi(prompt) {
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
    // For local development, use your Gemini API key from environment variables.
    // Make sure you have REACT_APP_GEMINI_API_KEY defined in your .env file.
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // <--- IMPORTANT CHANGE HERE
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
