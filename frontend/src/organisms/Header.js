import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header = ({ onLoginClick, onSignUpClick }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = window.location.pathname;
  const { authUser, isLoggedIn } = useContext(AuthContext);

  const handleTitleClick = () => {
    if (currentPath === '/login' || currentPath === '/signup') {
      return;
    }
    if (currentPath === '/') {
      window.location.reload();
    } else {
      navigate('/');
    }
  };

  const handleIconClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex justify-between items-center px-4 py-2 bg-gray-50 shadow-md w-full fixed top-0 left-0 z-10">
      <h1
        onClick={handleTitleClick}
        className={`text-lg md:text-xl lg:text-2xl font-extrabold tracking-wider ${
          currentPath === '/login' || currentPath === '/signup'
            ? 'text-gray-800'
            : 'text-gray-800 cursor-pointer hover:scale-105'
        } transition-transform duration-200`}
        style={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
          color: '#FFD700',
        }}
      >
        enmatch
      </h1>

      {currentPath !== '/login' && currentPath !== '/signup' && (
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full bg-gray-200 shadow-md flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-transform duration-200"
            onClick={handleIconClick}
          >
            {isLoggedIn && authUser?.icon ? (
              <img
                src={authUser.icon}
                alt="AuthUser Icon"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zM12 14c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z"
                />
              </svg>
            )}
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate('/mypage')}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    設定
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={onLoginClick}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    ログイン
                  </button>
                  <button
                    onClick={onSignUpClick}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    サインアップ
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
