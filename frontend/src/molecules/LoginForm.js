import React from 'react';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';

const LoginForm = ({ email, password, onEmailChange, onPasswordChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div className='mb-3'>
      <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
        Email address
      </label>
      <InputField
        id='email'
        type='email'
        placeholder='myblog@example.com'
        value={email}
        onChange={onEmailChange}
      />
    </div>
    <div>
      <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
        Password
      </label>
      <InputField
        id='password'
        type='password'
        placeholder='Enter your password'
        value={password}
        onChange={onPasswordChange}
      />
    </div>
    <Button
      type='submit'
      label='Login'
      className='mt-5 w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700'
    />
  </form>
);

export default LoginForm;
