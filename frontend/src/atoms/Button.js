// src/atoms/Button.js
import React from 'react';

const Button = ({ onClick, text, style, disabled }) => {
  return (
    <button onClick={onClick} style={style} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
