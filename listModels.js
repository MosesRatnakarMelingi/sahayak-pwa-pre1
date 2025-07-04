// testGeminiApi.js (or listModels.js)
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = "AIzaSyD5vsCpEXtVZLqiACEqCgvGbqWOBlGrhxw"; // Ensure this is your correct key

async function testGeminiContentGeneration() {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    // CHANGE THIS LINE:
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Try "gemini-1.5-pro" or "gemini-1.5-flash"

    const prompt = "Write a very short, simple story about a curious squirrel.";

    console.log(`Sending prompt to Gemini-Pro: "${prompt}"`); // Note: The log still says "Gemini-Pro" but it's using the new model
    console.log("If this fails, it's likely an API key or project access issue.");

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("\n--- Gemini's Response ---");
    console.log(text);
    console.log("------------------------");

  } catch (error) {
    console.error("\nError testing Gemini API:", error);
    // ... (rest of your error handling)
  }
}

testGeminiContentGeneration();