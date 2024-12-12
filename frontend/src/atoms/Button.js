import React from 'react';


// ボタンの3Dとホバーはここで実装しているが、色などの指定は親側で実装
const Button = ({ type = "button", label, onClick, className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`relative px-4 py-2 rounded-lg transition-transform duration-300 
                hover:translate-y-[-4px] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 
                ${className}`}
    style={{
      transformStyle: 'preserve-3d',
    }}
  >
    <span className="relative z-10">{label}</span>
  </button>
);

export default Button;
