import React from 'react';

const InputField = ({ id, type, placeholder, value, onChange }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className='block w-full p-1.5 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 placeholder:italic placeholder:text-gray-400'
  />
);

export default InputField;
