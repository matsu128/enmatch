import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSearchPage from './pages/UserSearch/UserSearchPage';
import ChatPage from './pages/Chat/ChatPage';
import MyPage from './pages/MyPage/MyPage';
import LoginPage from './pages/Login/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSearchPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
