import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/request-test');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-[#e0e7ff] flex items-center justify-center px-6">
      <div className="max-w-4xl text-center py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-[#39ff14] to-[#f7971e] drop-shadow-[0_2px_20px_#00f2fe]">
          Ace Your Learning with <span className="text-[#39ff14]">AI-Powered Quizzes</span>
        </h1>

        <p className="text-lg md:text-xl text-[#cbd5e1] mb-10 bg-[#1e293b]/50 p-6 rounded-xl shadow-lg border border-[#39ff14]/20">
          <strong className="text-[#00f2fe]">SelfQuizAI</strong> lets you instantly generate intelligent quizzes powered by{" "}
          <strong className="text-[#ff00cc]">Google Gemini</strong>. Whether you're prepping for battle or flexing your mind, we're your neon-powered wingman. ⚡
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={handleStartQuiz}
            className="relative group px-8 py-3 rounded-xl text-lg font-bold text-[#0f2027] bg-gradient-to-r from-[#00f2fe] via-[#39ff14] to-[#00f2fe] hover:scale-105 transition transform duration-300 shadow-lg"
          >
            <span className="absolute inset-0 rounded-xl opacity-60 blur-lg bg-gradient-to-r from-[#00f2fe] via-[#39ff14] to-[#00f2fe] animate-pulse group-hover:opacity-80 group-hover:blur-xl z-0"></span>
            <span className="relative z-10">🚀 Start Quiz</span>
          </button>

          <Link
            to="/about"
            className="relative group px-8 py-3 rounded-xl text-lg font-bold border border-[#00f2fe] text-[#00f2fe] hover:text-[#39ff14] hover:border-[#39ff14] transition duration-300"
          >
            <span className="absolute inset-0 rounded-xl blur-md opacity-30 group-hover:opacity-50 group-hover:blur-lg transition-all bg-gradient-to-r from-[#00f2fe] via-[#ff00cc] to-[#f7971e] animate-pulse z-0"></span>
            <span className="relative z-10">🔍 Learn More</span>
          </Link>
        </div>

        <div className="mt-16 text-sm text-[#94a3b8]">
          Built by{' '}
          <a
            href="https://www.linkedin.com/in/dharmik-l-7b9865250/"
            className="underline hover:text-[#ff00cc] transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dharmik Lakhankiya
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
