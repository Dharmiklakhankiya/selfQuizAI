import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: {
    A: String,
    B: String,
    C: String,
    D: String,
  },
  correct: String,
});

const quizSchema = new mongoose.Schema({
  topic: String,
  difficulty: String,
  count: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  questions: [questionSchema],
});

export const Quiz = mongoose.model("Quiz", quizSchema);