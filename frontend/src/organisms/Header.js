import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CursorClickIcon } from '@heroicons/react/solid';

const Header = ({ onLoginClick, onSignUpClick }) => {
  const navigate = useNavigate(); // ページ遷移用のフック
  const [menuOpen, setMenuOpen] = useState(false); // メニューの開閉状態を管理するstate
  const currentPath = window.location.pathname; // 現在のURLパスを取得
  const [authUser, setAuthUser] = useState(''); // sessionStorageからuser情報を取得してstateに保存

  // メニューとヘッダー全体の参照
  const menuRef = useRef(null);
  const headerRef = useRef(null);

  // sessionStorageからrandomIdを取得してログイン状態を判定
  const isLoggedIn = !!sessionStorage.getItem("randomId");

  // タイトルクリック時の挙動
  const handleTitleClick = () => {
    if (currentPath === '/login' || currentPath === '/signup') {
      return; // ログインまたはサインアップ画面ではタイトルクリックを無効化
    }
    if (currentPath === '/') {
      window.location.reload(); // ホーム画面でリロード
    } else {
      navigate('/'); // 他のページからホームへ遷移
    }
  };

  // アイコンクリック時の挙動
  const handleIconClick = () => {
    setMenuOpen(!menuOpen); // メニューの開閉状態をトグル
  };

  // メニューを閉じる
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // ログアウト処理
  const handleLogout = () => {
    sessionStorage.clear(); // sessionStorageをクリア
    closeMenu(); // メニューを閉じる
    navigate('/'); // ルートに遷移
  };

  // タイトルとアイコンの間の空白をクリックしたときに/secretに遷移する関数
  const handleHiddenClick = () => {
    navigate('/secret'); // /secretへ遷移
  };

  // sessionStorageからuser情報を取得して状態を更新
  useEffect(() => {
    const authUser = sessionStorage.getItem('user');
    if (authUser) {
      setAuthUser(authUser);
    }
  }, []);

  // ヘッダーまたはメニュー外のクリックでメニューを閉じる処理
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  if (currentPath === '/secret') {
    return (
      <header className="flex justify-between items-center px-4 py-2 bg-white shadow-md w-full fixed top-0 left-0 z-10">
        <h1
          onClick={handleTitleClick}
          className="text-lg md:text-xl lg:text-2xl font-extrabold tracking-wider text-gray-800 hover:text-yellow-500 hover:scale-105 transition-all"
        >
          enmatch
        </h1>
      </header>
    );
  }

  return (
    <header
      ref={headerRef} // ヘッダー全体の参照
      className="flex justify-between items-center px-4 py-2 bg-gray-50 shadow-md w-full fixed top-0 left-0 z-10"
    >
      {/* タイトル */}
      <h1
        onClick={handleTitleClick}
        className={`text-lg md:text-xl lg:text-2xl font-extrabold tracking-wider ${
          currentPath === '/login' || currentPath === '/signup'
            ? 'text-gray-800'
            : 'text-gray-800 cursor-pointer hover:scale-105'
        } transition-transform duration-200`}
        style={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)', // テキストシャドウ
          color: '#FFD700', // タイトルの文字色
        }}
      >
        enmatch
      </h1>

      {/* タイトルとアイコンの間の空白部分 */}
      <div
        onClick={handleHiddenClick}
        className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 cursor-pointer"
        style={{ width: 'calc(100% / 3)' }} // enmatchとアイコンの間の中心を覆う
      >
          <div className="flex justify-center items-center h-full">
            {/* 隠しクリック範囲 */}
          </div>
      </div>

      {/* ログイン・メニューアイコン */}
      {currentPath !== '/secret' && (
        <div className="relative">
          {/* アイコン */}
          <div
            className="w-10 h-10 rounded-full bg-gray-200 shadow-md flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-transform duration-200"
            onClick={handleIconClick}
          >
            {isLoggedIn && authUser?.icon ? (
              <img
                src={authUser.icon} // ユーザーのアイコンを表示
                alt="AuthUser Icon"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              // デフォルトアイコンのSVG
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zM12 14c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z"
                />
              </svg>
            )}
          </div>

          {/* メニュー */}
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {isLoggedIn ? (
                <>
                  {/* 設定ページへのリンク */}
                  <button
                    onClick={() => {
                      navigate('/mypage');
                      closeMenu(); // メニューを閉じる
                    }}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    設定
                  </button>
                  <div
                    onClick={handleLogout}
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-red-500"
                  >
                    ログアウト
                  </div>
                </>
              ) : (
                <>
                  {/* ログインボタン */}
                  <button
                    onClick={() => {
                      onLoginClick(); // ログインイベントを発火
                      closeMenu();
                    }}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    ログイン
                  </button>
                  {/* サインアップボタン */}
                  <button
                    onClick={() => {
                      onSignUpClick(); // サインアップイベントを発火
                      closeMenu();
                    }}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    サインアップ
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
