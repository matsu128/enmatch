import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginContainer from '../organisms/Login/LoginContainer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        email: email.trim(),
        password: password.trim(),
      });
      sessionStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'Email address or password is incorrect.'
          : err.response?.data?.message || 'Login failed'
      );
    }
  };

  const joinBloggerHandler = () => {
    navigate('/signup');
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Login to your account
        </h2>
      </div>
      <LoginContainer
        email={email}
        password={password}
        error={error}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={loginSubmitHandler}
        onJoinClick={joinBloggerHandler}
      />
    </div>
  );
};

export default LoginPage;
