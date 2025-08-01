import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error('Registration failed');
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 rounded-xl bg-[#0f172a]/90 shadow-[0_0_30px_#00f2fe] border border-[#00f2fe]/20 backdrop-blur-md">
        <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#39ff14] drop-shadow-md mb-8">
          Create Your Account
        </h2>

        {error && (
          <p className="mb-4 p-3 bg-red-600/20 text-red-400 rounded-md text-sm border border-red-500/30">
            ❌ {error}
          </p>
        )}

        {success && (
          <p className="mb-4 p-3 bg-green-600/20 text-green-400 rounded-md text-sm border border-green-500/30">
            ✅ Registration successful! Redirecting to login...
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1e293b] text-white placeholder-gray-400 border border-[#00f2fe]/20 focus:outline-none focus:ring-2 focus:ring-[#39ff14]"
              placeholder="Choose your codename"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1e293b] text-white placeholder-gray-400 border border-[#00f2fe]/20 focus:outline-none focus:ring-2 focus:ring-[#39ff14]"
              placeholder="Lock it down"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00f2fe] via-[#39ff14] to-[#00f2fe] text-[#0f172a] font-bold py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            🔐 Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
