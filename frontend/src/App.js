import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSearchPage from './pages/UserSearch/UserSearchPage_local';
import ChatPage from './pages/Chat/ChatPage';
import MyPage from './pages/MyPage/MyPage';
import LoginPage from './pages/Login/LoginPage';
import Header from './atoms/Header'; // Headerをインポート

function App() {
  return (
    <Router>
      <Routes>
        {/* '/' パスに対して Header を表示 */}
        <Route 
          path="/" 
          element={
            <>
              <Header isLoggedIn={false} /> {/* ヘッダーの表示 */}
              <div className="mt-16"> {/* ヘッダーの高さ分だけ余白を追加 */}
                <UserSearchPage /> {/* ページのコンテンツ */}
              </div>
            </>
          } 
        />
        
        {/* '/chat' パスに対して Header を表示 */}
        <Route 
          path="/chat" 
          element={
            <>
              <Header isLoggedIn={false} /> {/* ヘッダーの表示 */}
              <div className="mt-16"> {/* ヘッダーの高さ分だけ余白を追加 */}
                <ChatPage /> {/* チャットページのコンテンツ */}
              </div>
            </>
          } 
        />
        
        {/* その他のページ */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
