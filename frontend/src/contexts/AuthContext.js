import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null); // Userテーブルの情報(Header,LoginModal)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態を管理(UserList,LoginModal)
  

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
