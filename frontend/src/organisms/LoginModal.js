import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext'; // 認証コンテキストをインポート

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState(''); // 入力されたメールアドレス
  const [password, setPassword] = useState(''); // 入力されたパスワード
  const [error, setError] = useState(null); // エラー表示用のstate
  const [validationErrors, setValidationErrors] = useState({}); // 入力検証エラーのstate
  const { setAuthRandomId, setAuthUser, onLoginSuccess } = useContext(AuthContext); // 認証情報のコンテキストから関数を取得

  // 入力値を検証する関数
  const validateInputs = () => {
    const errors = {};
    if (!email.trim()) errors.email = 'メールアドレスを入力してください。';
    if (!password.trim()) errors.password = 'パスワードを入力してください。';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ログイン処理を実行する関数
  const loginSubmitHandler = async () => {
    if (!validateInputs()) return; // 入力検証エラーがあれば処理を中断

    try {
      const response = await axios.post('/api/auth/login', {
        email: email.trim(),
        password: password.trim(),
      });

      const { randomId, user } = response.data; // サーバーからのレスポンスデータを取得
      setAuthRandomId(randomId); // 認証情報をコンテキストに保存
      setAuthUser(user);

      onLoginSuccess(); // AuthContextのonLoginSuccessを呼び出す

      onClose(); // モーダルを閉じる
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'メールアドレスまたはパスワードが間違っています。'
          : err.response?.data?.message || 'ログインに失敗しました。'
      );
    }
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-8 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          ログイン
        </h2>
      </div>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        {/* フォームコンポーネント */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              メールアドレス
            </label>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            />
            {validationErrors.email && <p className='text-red-500'>{validationErrors.email}</p>}
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              パスワード
            </label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            />
            {validationErrors.password && <p className='text-red-500'>{validationErrors.password}</p>}
          </div>
          {error && <p className='text-red-500'>{error}</p>}
          <div>
            <button
              type='button'
              onClick={loginSubmitHandler}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
