// src/atoms/Header.js

/*
TODO：Chat画面専用にこのHeaderを作成してるが、本来はコンポーネント全体に対してのHeaderである必要があるから修正すべき
*/

import React from 'react';

const Header = ({ title, onBack }) => {
  return (
    <header className="flex items-center p-4 bg-gray-100 border-b border-gray-300">
      {/* 戻るボタン */}
      <button 
        onClick={onBack} 
        className="mr-4 text-xl cursor-pointer focus:outline-none"
      >
        ←
      </button>
      {/* タイトル */}
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
};

export default Header;
