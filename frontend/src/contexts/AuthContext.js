import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [AuthRandomId, setAuthRandomId] = useState(null); // 本人のランダムID(LoginModal,ChatPage)
  const [authUser, setAuthUser] = useState(null); // Userテーブルの情報(Header,LoginModal)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態を管理(UserList,LoginModal)

  return (
    <AuthContext.Provider value={{ AuthRandomId, setAuthRandomId, authUser, setAuthUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
