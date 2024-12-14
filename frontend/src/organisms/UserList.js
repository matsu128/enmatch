// src/organisms/UserList.js
import React, { useState } from "react";
import UserCard from "../molecules/UserCard";
import { useNavigate } from "react-router-dom";

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (userId) => {
    setSelectedUser(userId === selectedUser ? null : userId);
  };

  const handleChatClick = (e) => {
    e.stopPropagation();
    navigate("/chat");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onClick={() => handleCardClick(user.id)}
          isSelected={selectedUser === user.id}
          handleChatClick={handleChatClick}
        />
      ))}
    </div>
  );
};

export default UserList;


/*
// 以下はランダムIDを付与したversionのコード
// 懸念点として選択した時に全員のデータが表示されないかという点である。これが問題ないなら以下で完璧だ。
import React, { useState } from "react";
import UserCard from "../molecules/UserCard";
import { useNavigate } from "react-router-dom";

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (userId) => {
    setSelectedUser(userId === selectedUser ? null : userId);
  };

  const handleChatClick = (randomId) => {
    console.log("選択されたユーザーのランダムID:", randomId);
    navigate("/chat", { state: { randomId } });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
      {users.map((user) => (
        <UserCard
          key={user.randomId}
          user={user}
          onClick={() => handleCardClick(user.randomId)}
          isSelected={selectedUser === user.randomId}
          handleChatClick={() => handleChatClick(user.randomId)}
        />
      ))}
    </div>
  );
};

export default UserList;
*/