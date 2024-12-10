import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState(''); // メールアドレス
  const [password, setPassword] = useState(''); // パスワード
  const [error, setError] = useState(null); // エラーメッセージ
  const navigate = useNavigate(); // useNavigateフックを初期化

  // フォーム送信時の処理
  const loginSubmitHandler = async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信動作を防止

    try {
      // ログインリクエストをバックエンドに送信
      const response = await axios.post('/api/auth/login', {
        email: email.trim(),
        password: password.trim(),
      });

      // 成功時の処理
      sessionStorage.setItem('token', response.data.token); // トークンをセッションストレージに保存
      navigate('/'); // ホームまたはダッシュボードページにリダイレクト
    } catch (error) {
      // エラーハンドリング
      if (error.response) {
        // サーバーからのレスポンスがある場合
        if (error.response.status === 401) {
          setError('Email address or password is incorrect.');
        } else {
          setError(error.response.data.message || 'Login failed');
        }
      } else {
        // ネットワークエラーなどの場合
        console.error("Login request failed:", error);
        setError('An unexpected error occurred');
      }
    }
  };

  // サインアップページへのリダイレクト処理
  const joinBloggerHandler = () => {
    navigate('/signup'); // サインアップページにリダイレクト
  };

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Login to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
              <strong className='font-bold'>Error!</strong>
              <span className='block sm:inline'> {error}</span>
            </div>
          )}

          <form onSubmit={loginSubmitHandler}>
            <div className='mb-3'>
              <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='block w-full p-1.5 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 placeholder:italic placeholder:text-gray-400'
                  placeholder='myblog@example.com'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                  Password
                </label>
                <div className='text-sm'>
                  <a href='#' className='font-semibold text-orange-600 hover:text-orange-500'>
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='password'
                  required
                  className='block w-full p-1.5 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 placeholder:italic'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type='submit'
              className='mt-5 w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700'>
              Login
            </button>
          </form>

          <button
            onClick={joinBloggerHandler}
            className='mt-2 w-full rounded-md bg-gray-500 px-4 py-2 text-white font-semibold hover:bg-gray-600'>
            Join our blogger
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
