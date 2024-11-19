import React, { useState } from 'react';

const LoginPage = () => {
  // ユーザーの入力データを管理するための状態変数
  const [email, setEmail] = useState(''); // メールアドレス
  const [password, setPassword] = useState(''); // パスワード
  const [error, setError] = useState(null); // エラーメッセージ

  // フォーム送信時の処理
  const loginSubmitHandler = async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信動作を防止

    // 入力値のトリム処理（前後の空白を削除）
    const sanitizedEmail = email.trim();
    const sanitizedPassword = password.trim();

    try {
      // ログインリクエストをバックエンドに送信
      const response = await fetch('/api/auth/login', { // `/login`エンドポイントにPOSTリクエストを送信
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSONデータを送信
        },
        body: JSON.stringify({ email: sanitizedEmail, password: sanitizedPassword }), // メールとパスワードをJSON形式で送信
      });

      // レスポンスが成功（ステータスコード200台）の場合
      if (response.ok) {
        console.log("front,login,resパス");
        const result = await response.json(); // サーバーからのレスポンスをJSONとして解析
        sessionStorage.setItem('token', result.token); // トークンをセッションストレージに保存
        window.location.href = '/'; // ホームまたはダッシュボードページにリダイレクト
      } else if (response.status === 401) {
        // 認証エラーの場合（メールまたはパスワードが間違っている）
        setError('Email address or password is incorrect.');
      } else {
        // その他のエラーの場合
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      // ネットワークエラーなど予期しないエラー
      console.error("Login request failed:", error);  // 詳細なエラーメッセージを出力
      setError('An unexpected error occurred');
    }
  };

  // サインアップページへのリダイレクト処理
  const joinBloggerHandler = () => {
    window.location.href = '/signup'; // サインアップページにリダイレクト
  };

  return (
    <>
      {/* ページ全体のレイアウト */}
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        {/* ログイン画面のヘッダー */}
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Login to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          {/* エラーメッセージの表示 */}
          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
              <strong className='font-bold'>Error!</strong>
              <span className='block sm:inline'> {error}</span>
            </div>
          )}

          {/* ログインフォーム */}
          <form onSubmit={loginSubmitHandler}>
            <div className='mb-3'>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'>
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
                  placeholder='myblog@example.com' // 入力フィールドのプレースホルダー
                  onChange={(e) => setEmail(e.target.value)} // 入力値をemail状態に設定
                />
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-orange-600 hover:text-orange-500'>
                    Forgot password? {/* パスワードを忘れた場合のリンク */}
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
                  onChange={(e) => setPassword(e.target.value)} // 入力値をpassword状態に設定
                />
              </div>
            </div>
            <button
              type='submit'
              className='mt-5 w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700'>
              Login {/* ログインボタン */}
            </button>
          </form>

          {/* サインアップページに移動するボタン */}
          <button
            onClick={joinBloggerHandler}
            className='mt-2 w-full rounded-md bg-gray-500 px-4 py-2 text-white font-semibold hover:bg-gray-600'>
            Join our blogger {/* サインアップボタン */}
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
