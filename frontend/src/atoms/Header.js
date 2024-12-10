import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, userIconUrl, userName }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTitleClick = () => {
    navigate('/');
  };

  const handleIconClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSettingsClick = () => {
    navigate('/mypage');
  };

  return (
    <header className="flex justify-between items-center px-4 py-2 bg-gray-50 shadow-md w-full fixed top-0 left-0 z-10">
      {/* タイトル */}
      <h1
        onClick={handleTitleClick}
        className="text-lg md:text-xl lg:text-2xl font-extrabold tracking-wider text-gray-800 cursor-pointer hover:scale-105 transition-transform duration-200"
        style={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
          color: '#FFD700', // 近未来な黄色
        }}
      >
        enmatch
      </h1>

      {/* アイコン */}
      <div className="relative">
        <div
          className="w-10 h-10 rounded-full bg-gray-200 shadow-md flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-transform duration-200"
          onClick={handleIconClick}
        >
          <img
            src={isLoggedIn ? userIconUrl : '/default-icon.png'}
            alt="User Icon"
            className="w-8 h-8 rounded-full"
          />
        </div>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
            {isLoggedIn ? (
              <>
                <div className="px-4 py-2 text-gray-700 border-b">{userName}</div>
                <button
                  onClick={handleSettingsClick}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  設定
                </button>
              </>
            ) : (
              <button
                onClick={handleLoginClick}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                ログイン
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
