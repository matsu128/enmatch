import React from 'react';
import LoginForm from '../../molecules/LoginForm';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';

const LoginContainer = ({
  email,
  password,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onJoinClick,
}) => (
  <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
    {error && <ErrorMessage message={error} />}
    <LoginForm
      email={email}
      password={password}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      onSubmit={onSubmit}
    />
    <Button
      label='Join our blogger'
      onClick={onJoinClick}
      className='mt-2 w-full rounded-md bg-gray-500 px-4 py-2 text-white font-semibold hover:bg-gray-600'
    />
  </div>
);

export default LoginContainer;
