import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";

config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function robustJsonParse(rawText) {
  const startIndex = rawText.indexOf('[');
  const endIndex = rawText.lastIndexOf(']');

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error("Could not find a valid JSON array in the response.");
  }

  let jsonString = rawText.substring(startIndex, endIndex + 1);

  // Remove invalid control characters
  jsonString = jsonString.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

  // Fix common JSON formatting issues
  jsonString = jsonString.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ''); // Remove comments
  jsonString = jsonString.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":'); // Quote keys
  jsonString = jsonString.replace(/,\s*([}\]])/g, '$1'); // Remove trailing commas

  try {
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Failed to parse sanitized JSON:", err);
    throw new Error("Failed to parse questions from sanitized AI response.");
  }
}

export async function generateQuestions({ topic, count, difficulty }) {
  if (count > 50) {
    throw new Error("Maximum number of questions allowed is 50.");
  }

  const promptJSON = {
    topic: topic,
    count: count,
    difficulty: difficulty,
    format:
      "Respond only with a JSON array of question objects. Each object must have a 'question' (string), 'options' (an object with keys A, B, C, D and string values for each option), and 'correct' (a string, either 'A', 'B', 'C', or 'D').",
  };

  const finalPrompt = `Generate ${promptJSON.count} multiple-choice questions about ${promptJSON.topic}. The difficulty level should be ${promptJSON.difficulty}. ${promptJSON.format}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-04-17",
    contents: finalPrompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  try {
    const questions = robustJsonParse(response.text);
    return questions;
  } catch (err) {
    console.error("Failed to robustly parse JSON from response:", err);
    console.error("Raw AI Response Text:", response.text);
    throw new Error("Failed to parse questions from AI response.");
  }
}