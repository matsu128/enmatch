import React, { useState } from 'react';
import axios from 'axios';
import Button from '../atoms/Button'; // Buttonコンポーネントをインポート

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState(''); // 入力されたメールアドレス
  const [password, setPassword] = useState(''); // 入力されたパスワード
  const [error, setError] = useState(null); // エラー表示用のstate
  const [validationErrors, setValidationErrors] = useState({}); // 入力検証エラーのstate

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
      
      // sessionStorage に認証情報を保存
      sessionStorage.setItem('randomId', randomId);
      sessionStorage.setItem('user', JSON.stringify(user));

      onClose(); // モーダルを閉じる
      window.location.reload(); // ページをリロード
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'メールアドレスまたはパスワードが間違っています。'
          : err.response?.data?.message || 'ログインに失敗しました。'
      );
    }
  };

  return (
    <div className="flex h-full flex-1 flex-col p-0">
      {/* タイトル */}
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-16 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          ログイン
        </h2>
      </div>

      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        {/* フォームコンポーネント */}
        <form onSubmit={(e) => e.preventDefault()}>
          {/* メールアドレス入力 */}
          <div>
            <label htmlFor='email' className='mt-16 block text-base font-medium text-gray-700'>
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
              className='border border-gray-400 mt-1 block w-full rounded-md shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base'
            />
            {validationErrors.email && <p className='text-red-500'>{validationErrors.email}</p>}
          </div>

          {/* パスワード入力 */}
          <div>
            <label htmlFor='password' className='mt-4 block text-base font-medium text-gray-700'>
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
              className='border border-gray-400 mt-1 block w-full rounded-md shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base'
            />
            {validationErrors.password && <p className='text-red-500'>{validationErrors.password}</p>}
          </div>

          {/* エラーメッセージ表示 */}
          {error && <p className='text-red-500'>{error}</p>}

          {/* ログインボタン */}
          <div>
            <Button
              type="button"
              label="ログイン"
              onClick={loginSubmitHandler}
              className="mt-16 mb-16 w-full bg-yellow-300 text-white py-2 px-4 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
