import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // 認証コンテキストのプロバイダーをインポート
import UserSearchPage from './pages/UserSearchPage'; // ユーザー検索ページコンポーネント
import ChatPage from './pages/ChatPage'; // チャットページコンポーネント
import MyPage from './pages/MyPage'; // マイページコンポーネント
import SecretPage from './pages/SecretPage'; // SecretPageコンポーネントをインポート
import Header from './organisms/Header'; // ヘッダーコンポーネント
import LoginModal from './organisms/LoginModal'; // ログインモーダルコンポーネント
import SignUpModal from './organisms/SignUpModal'; // サインアップモーダルコンポーネント

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false); // ログインモーダルの表示状態を管理するstate
  const [showSignUpModal, setShowSignUpModal] = useState(false); // サインアップモーダルの表示状態を管理するstate

  // ログインボタンクリック時にモーダルを表示
  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  // サインアップボタンクリック時にモーダルを表示
  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  // モーダルを閉じる処理
  const closeModal = () => {
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  onLoginClick={handleLoginClick}
                  onSignUpClick={handleSignUpClick}
                />
                <div className="mt-14">
                  <UserSearchPage onLoginClick={handleLoginClick} />
                </div>
                {showLoginModal && (
                  <div
                    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20"
                    onClick={closeModal}
                  >
                    <div
                      className="bg-white px-8 rounded-lg shadow-2xl transform transition-all duration-300 scale-105 max-w-[90vw] max-h-[90vh] sm:h-[500px] md:h-[500px] lg:w-[600px] lg:h-[500px] w-96 relative overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        boxShadow:
                          '0px 10px 20px rgba(0, 0, 0, 0.3), 0px 6px 6px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      <LoginModal onClose={closeModal} />
                    </div>
                  </div>
                )}
                {showSignUpModal && (
                  <div
                    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20"
                    onClick={closeModal}
                  >
                    <div
                      className="bg-white px-8 rounded-lg shadow-2xl transform transition-all duration-300 scale-105 max-w-[90vw] max-h-[90vh] sm:h-[500px] md:h-[500px] lg:w-[600px] lg:h-[500px] w-96 relative overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        boxShadow:
                          '0px 10px 20px rgba(0, 0, 0, 0.3), 0px 6px 6px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      <SignUpModal onClose={closeModal} />
                    </div>
                  </div>
                )}
              </>
            }
          />
          <Route
            path="/chat"
            element={
              <>
                <Header />
                <div className="mt-14">
                  <ChatPage />
                </div>
              </>
            }
          />
          <Route
            path="/mypage"
            element={
              <>
                <Header />
                <div className="mt-14">
                  <MyPage />
                </div>
              </>
            }
          />
          <Route
            path="/secret"
            element={
              <>
                <Header />
                <div className="mt-12">
                  <SecretPage />
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
