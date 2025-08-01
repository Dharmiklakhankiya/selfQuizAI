import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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
        const res = await fetch(`${API_URL}/quiz/${id}`);
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
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleOptionSelect = (optionKey) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionKey }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinish = () => setIsFinished(true);

  const score = useCallback(() => {
    if (!quiz) return 0;
    return quiz.questions.reduce((total, q, i) => {
      return answers[i] === q.correct ? total + 1 : total;
    }, 0);
  }, [quiz, answers]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-[#00f2fe] font-mono text-2xl p-10 animate-pulse">
        ⚙️ Loading Quiz...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6">
        <div className="max-w-4xl mx-auto p-6 bg-[#0f172a]/80 text-[#ff4d4d] rounded-lg border border-[#ff4d4d]/50 shadow-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!quiz) {
    return <div className="text-center p-10 text-pink-300">No quiz data found.</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  if (isFinished) {
    const finalScore = score();
    return (
      <div className="max-w-3xl mx-auto mt-10 p-8 bg-black/40 rounded-xl border border-indigo-500/30 backdrop-blur-md text-center text-cyan-100 shadow-[0_0_30px_#6366f1]">
        <h2 className="text-4xl font-bold mb-4 text-pink-400">🎉 Quiz Complete!</h2>
        <p className="text-xl mb-2">
          Score: <span className="text-green-400 font-bold">{finalScore}</span> / {totalQuestions}
        </p>
        <p className="text-sm text-gray-300 mb-6">
          ⏱ Time taken: <span className="text-cyan-300">{formatTime(elapsedTime)}</span>
        </p>
        <div className="space-y-4 text-left text-sm text-white">
          {quiz.questions.map((q, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg border ${
                answers[i] === q.correct ? 'bg-green-800/30 border-green-400' : 'bg-red-800/30 border-red-400'
              }`}
            >
              <p className="font-semibold text-white">{i + 1}. {q.question}</p>
              <p className="text-cyan-300">Your answer: <span className="text-pink-400">{answers[i] ? `${answers[i]}. ${q.options[answers[i]]}` : 'Not answered'}</span></p>
              <p className="text-purple-300">Correct: <span className="text-green-400">{q.correct}. {q.options[q.correct]}</span></p>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/history')}
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold transition-all duration-300"
        >
          🔙 Return to History
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl p-8 bg-[#0f172a]/90 rounded-xl border border-[#00f2fe]/20 text-white shadow-[0_0_30px_#00f2fe] backdrop-blur-md">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-indigo-400">{quiz.topic} Quiz</h2>
            <span className="text-sm text-gray-400">Question {currentQuestionIndex + 1} / {totalQuestions}</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-400">🟢 Time: {formatTime(elapsedTime)}</p>
            <button onClick={handleFinish} className="text-xs text-red-400 hover:underline">💥 Finish Early</button>
          </div>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
          <div
            className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>

        <p className="text-lg font-bold mb-4 text-white">{currentQuestion.question}</p>

        <div className="space-y-4">
          {Object.entries(currentQuestion.options).map(([key, val]) => (
            <button
              key={key}
              onClick={() => handleOptionSelect(key)}
              className={`w-full text-left p-4 rounded-md border transition-all duration-200 font-mono tracking-wide ${
                answers[currentQuestionIndex] === key
                  ? 'bg-indigo-900/50 border-indigo-400 text-indigo-200 shadow-[0_0_10px_#818cf8]'
                  : 'bg-slate-800 border-gray-600 hover:border-indigo-400 hover:bg-slate-700'
              }`}
            >
              <span className="font-bold text-pink-400">{key}.</span> {val}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-600 disabled:opacity-40"
          >
            ← Back
          </button>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              onClick={handleNext}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-700"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700"
            >
              🚀 Finish Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeTest;
