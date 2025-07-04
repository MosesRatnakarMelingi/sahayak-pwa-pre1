import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

// Access your API key (make sure it's in your .env file in the root)
const genAI = new GoogleGenerativeAI(API_KEY);

// For text-only and multimodal input
// Using gemini-1.5-pro for broader capability including future image input
const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export { textModel };