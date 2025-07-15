import express from "express";
import { generateQuestions } from "./generateQuestions.js";
import cors from "cors";
import { connectDB } from "./db.js";
import { Quiz } from "./models/Quiz.js";
import authRoutes from "./routes/authRoutes.js"; // Import auth routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Connect to Mongo
connectDB();

app.use((req, res, next) => {
  console.log("🧃 New Request:", req.method, req.url);
  next();
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Existing routes
app.get("/questions/:topic/:difficulty/:count", async (req, res) => {
  const { topic, difficulty, count } = req.params;
  const numCount = parseInt(count, 10);

  if (isNaN(numCount) || numCount <= 0 || numCount > 50) {
    return res
      .status(400)
      .json({ error: "Count must be a number between 1 and 50." });
  }

  try {
    const questions = await generateQuestions({
      topic,
      count: numCount,
      difficulty,
    });

    res.json(questions);
  } catch (err) {
    console.error("Error generating questions:", err);
    res.status(500).json({ error: "Failed to generate questions." });
  }
});

// POST /quiz
app.post("/quiz", express.json(), async (req, res) => {
  const { topic, difficulty, count } = req.body;
  console.log(`✨ Generating quiz for topic: ${topic}`);
  const numCount = parseInt(count, 10);

  if (isNaN(numCount) || numCount <= 0) {
    return res.status(400).json({ error: "Invalid count." });
  }

  if (numCount > 50) {
    console.warn("💡 Count above 50 — generating anyway.");
  }

  try {
    const questions = await generateQuestions({
      topic,
      count: numCount,
      difficulty,
    });

    const newQuiz = new Quiz({
      topic,
      difficulty,
      count: numCount,
      questions,
    });

    const savedQuiz = await newQuiz.save();
    console.log(`✅ Quiz saved with ID: ${savedQuiz._id}`);
    res.status(201).json({ message: "Quiz stored", quizId: savedQuiz._id });
  } catch (err) {
    console.error("❌ Error storing quiz:", err);
    res.status(500).json({ error: "Failed to create quiz." });
  }
});

// GET /history
app.get("/history", async (req, res) => {
  try {
    const history = await Quiz.find(
      {},
      {
        _id: 1,
        topic: 1,
        difficulty: 1,
        count: 1,
        createdAt: 1,
      }
    ).sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to fetch history." });
  }
});

// GET /quiz/:id
app.get("/quiz/:id", async (req, res) => {
  try {
    const quizId = req.params.id;
    console.log(`🔎 Fetching quiz with ID: ${quizId}`);
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      console.warn(`🚨 Quiz not found for ID: ${quizId}`);
      return res.status(404).json({ error: "Quiz not found" });
    }

    console.log(`✅ Found quiz on topic: ${quiz.topic}`);
    res.json(quiz);
  } catch (err) {
    console.error("❌ Error fetching quiz:", err);
    res.status(500).json({ error: "Failed to fetch quiz." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});