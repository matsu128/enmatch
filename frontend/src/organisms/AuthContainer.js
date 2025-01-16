import React from 'react';
import AuthForm from '../molecules/AuthForm';
import ErrorMessage from '../atoms/ErrorMessage';

const AuthContainer = ({ email, password, error, onEmailChange, onPasswordChange, errors }) => (
  <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-sm'>
    {error && <ErrorMessage message={error} />}
    <AuthForm
      email={email}
      password={password}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      errors={errors}
    />
  </div>
);

export default AuthContainer;
