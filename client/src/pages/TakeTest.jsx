import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL; // 👈 FIXED

const TakeTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/quiz/${id}`); // 👈 FIXED
        if (!res.ok) throw new Error(`Quiz not found or server error.`);
        const data = await res.json();
        setQuiz({ ...data, questions: data.questions || [] });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleOptionSelect = (optionKey) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: optionKey }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => setIsFinished(true);

  const score = useCallback(() => {
    if (!quiz) return 0;
    return quiz.questions.reduce((total, q, i) => {
      return answers[i] === q.correct ? total + 1 : total;
    }, 0);
  }, [quiz, answers]);

  // ...rest of your component is untouched. That call was the real threat.
};

export default TakeTest;
