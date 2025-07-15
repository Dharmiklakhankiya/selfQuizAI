import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 rounded-xl bg-[#0f172a]/90 shadow-[0_0_30px_#00f2fe] border border-[#00f2fe]/20 backdrop-blur-md">
        <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#39ff14] drop-shadow-md mb-8">
          Login to SelfQuizAI
        </h2>

        {error && (
          <p className="mb-4 p-3 bg-red-600/20 text-red-400 rounded-md text-sm border border-red-500/30">
            ⚠️ {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#94a3b8] mb-1">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1e293b] text-white placeholder-gray-400 border border-[#00f2fe]/20 focus:outline-none focus:ring-2 focus:ring-[#39ff14]"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#94a3b8] mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1e293b] text-white placeholder-gray-400 border border-[#00f2fe]/20 focus:outline-none focus:ring-2 focus:ring-[#39ff14]"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00f2fe] via-[#39ff14] to-[#00f2fe] text-[#0f172a] font-bold py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            🚀 Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
