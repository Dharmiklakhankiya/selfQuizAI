import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);

  const linkStyle = "bg-gradient-to-r from-[#00f2fe] via-[#39ff14] to-[#f7971e] bg-clip-text text-transparent drop-shadow-[0_1px_4px_#00f2fe] hover:scale-105 transition-transform duration-200";

  return (
    <nav className="w-full bg-[#0f2027]/90 backdrop-blur-md border-b border-[#00f2fe]/30 shadow-[0_2px_10px_#00f2fe33]">
      <div className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className={`text-2xl font-extrabold ${linkStyle}`}>
          SelfQuizAI
        </Link>
        <ul className="flex flex-wrap items-center gap-6 text-md sm:text-lg font-semibold">
          <li>
            <Link to="/" className={linkStyle}>Home</Link>
          </li>

          {token ? (
            <>
              <li>
                <Link to="/request-test" className={linkStyle}>Request Test</Link>
              </li>
              <li>
                <Link to="/history" className={linkStyle}>History</Link>
              </li>
              <li>
                <Link to="/about" className={linkStyle}>About</Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className={linkStyle}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={linkStyle}>Login</Link>
              </li>
              <li>
                <Link to="/register" className={linkStyle}>Register</Link>
              </li>
              <li>
                <Link to="/about" className={linkStyle}>About</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
