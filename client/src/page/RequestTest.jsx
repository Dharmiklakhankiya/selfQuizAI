import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestTest = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [numQuestions, setNumQuestions] = useState('10');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    const questionCount = parseInt(numQuestions, 10);
    if (!topic.trim() || isNaN(questionCount) || questionCount < 1 || questionCount > 50) {
      return setError('🛑 Please enter a valid topic and a question count between 1 and 50.');
    }

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3000/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty, count: questionCount })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Request failed with status ${res.status}`);
      }

      const { quizId } = await res.json();
      navigate('/history');
    } catch (err) {
      setError(
        '❌ Error generating quiz. Try a different topic/difficulty or check server logs.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4">
      <div className="w-full max-w-xl p-8 rounded-xl bg-[#1e293b]/90 shadow-[0_0_30px_#6366f1] border border-indigo-500/30 backdrop-blur-md">
        <h2 className="text-3xl font-extrabold text-center text-indigo-400 drop-shadow mb-8">
          🧠 Generate Your AI Quiz
        </h2>

        {error && (
          <p className="mb-4 p-3 bg-red-600/20 text-red-300 rounded-md text-sm border border-red-400/30">
            {error}
          </p>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-200 mb-1">
              Topic
            </label>
            <input
              id="topic"
              placeholder="e.g. GraphQL, Sorting Algorithms"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 rounded-md bg-[#0f172a] text-white placeholder-gray-400 border border-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-slate-200 mb-1">
              Difficulty
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 rounded-md bg-[#0f172a] text-white border border-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="easy">🟢 Easy</option>
              <option value="medium">🟠 Medium</option>
              <option value="hard">🔴 Hard</option>
            </select>
          </div>

          <div>
            <label htmlFor="numQuestions" className="block text-sm font-medium text-slate-200 mb-1">
              Number of Questions
            </label>
            <input
              id="numQuestions"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="10"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              className="w-full p-3 rounded-md bg-[#0f172a] text-white placeholder-gray-400 border border-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-md font-bold hover:scale-[1.02] hover:shadow-xl transition-all duration-300 flex items-center justify-center disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : '⚡ Generate Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestTest;
