import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";

config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function robustJsonParse(rawText) {
  const startIndex = rawText.indexOf('[');
  const endIndex = rawText.lastIndexOf(']');

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error("❌ Could not find a valid JSON array in the response.");
  }

  let jsonString = rawText.substring(startIndex, endIndex + 1);

  jsonString = jsonString
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')         // Remove control characters
    .replace(/\r?\n|\r/g, '')                             // Remove newlines
    .replace(/,\s*([}\]])/g, '$1')                        // Remove trailing commas
    .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":'); // Quote unquoted keys

  try {
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("💥 Final sanitized JSON string:\n", jsonString);
    throw new Error("🚫 JSON parsing still failed: " + err.message);
  }
}

export async function generateQuestions({ topic, count, difficulty }) {
  if (count > 50) {
    throw new Error("🚫 Maximum number of questions allowed is 50.");
  }

  const prompt = `
    Generate ${count} multiple-choice questions about ${topic}.
    Difficulty level: ${difficulty}.
    Respond ONLY with a JSON array of question objects.
    Each object must have:
      - "question": string
      - "options": { "A": string, "B": string, "C": string, "D": string }
      - "correct": string ("A", "B", "C", or "D")
    DO NOT include explanations, markdown, or anything outside the array.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  console.log("📦 Raw AI Response:\n", response.text);

  try {
    const questions = robustJsonParse(response.text);
    return questions;
  } catch (err) {
    console.error("🔥 Failed to robustly parse JSON from response:", err);
    throw new Error("💀 Failed to parse questions from AI response.");
  }
}
