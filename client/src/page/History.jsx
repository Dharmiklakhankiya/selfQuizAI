import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const History = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:3000/history');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        setError('Could not fetch quiz history. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleTakeQuiz = (id) => {
    navigate(`/test/${id}`);
  };

  const handleNewQuiz = () => {
    navigate('/request-test');
  };

  if (loading) {
    return <div className="text-center p-16 text-[#00f2fe] text-xl animate-pulse">Loading your quizzes...</div>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-10 bg-[#2c5364]/50 text-[#ff4d4d] border border-[#ff4d4d]/30 rounded-xl shadow-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-6 py-12 text-[#e0e7ff]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#00f2fe] via-[#39ff14] to-[#f7971e] text-transparent bg-clip-text drop-shadow-[0_2px_20px_#00f2fe]">
            📜 Quiz History
          </h1>
          <button
            onClick={handleNewQuiz}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-[#39ff14] via-[#00f2fe] to-[#39ff14] text-[#0f2027] font-semibold px-5 py-2 rounded-md shadow-lg hover:brightness-125 transition"
          >
            + Generate New Quiz
          </button>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-20 px-6 bg-[#181c2f]/60 rounded-xl shadow-md border border-[#00f2fe]/30">
            <h3 className="text-2xl font-semibold text-[#00f2fe]">No quizzes yet.</h3>
            <p className="mt-2 text-[#e0e7ff]/80">Let’s fix that with a fresh one.</p>
          </div>
        ) : (
          <div className="bg-[#181c2f]/50 backdrop-blur-md rounded-xl shadow-xl border border-[#00f2fe]/20">
            <ul className="divide-y divide-[#00f2fe]/10">
              {history.map((quiz) => (
                <li
                  key={quiz._id}
                  className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-[#2c5364]/40 transition duration-200"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-[#00f2fe] capitalize">{quiz.topic}</h3>
                    <p className="text-sm mt-1 text-[#e0e7ff]/70">
                      {quiz.count} Questions • <span className="capitalize">{quiz.difficulty}</span> •{' '}
                      {format(new Date(quiz.createdAt), 'PPpp')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleTakeQuiz(quiz._id)}
                    className="mt-4 sm:mt-0 bg-gradient-to-r from-[#f7971e] via-[#00f2fe] to-[#f7971e] text-[#0f2027] font-semibold px-4 py-2 rounded-md hover:scale-105 transition drop-shadow-[0_2px_10px_#00f2fe]"
                  >
                    Retake Quiz
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
