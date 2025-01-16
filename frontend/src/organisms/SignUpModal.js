import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContainer from '../organisms/AuthContainer';
import Button from '../atoms/Button';

const SignUpModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validateInputs = () => {
    const errors = {};
    if (!email.trim()) errors.email = 'メールアドレスを入力してください。';
    if (!password.trim()) errors.password = 'パスワードを入力してください。';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const signUpSubmitHandler = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axios.post('/api/auth/signup', {
        email: email.trim(),
        password: password.trim(),
      });
      sessionStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || '新規登録に失敗しました。'
      );
    }
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          新規作成
        </h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <AuthContainer
          email={email}
          password={password}
          error={error}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          errors={validationErrors}
        />
        <div className='mt-6 flex justify-center'>
          <Button
            label='新規登録'
            onClick={signUpSubmitHandler}
            className='w-full max-w-xs bg-gradient-to-r from-green-400 to-green-300 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
