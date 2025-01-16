import React, { useState, useContext } from "react";
import UserCard from "../molecules/UserCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

const UserList = ({ users, onLoginClick }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const handleCardClick = (userId) => {
    setSelectedUser(userId === selectedUser ? null : userId);
  };

  /**
   * チャットボタンがクリックされたときの処理
   * 選択されたユーザーのランダムIDを使ってチャット画面に遷移する
   * @param {string} randomId - 選択されたユーザーのランダムID
   */
  const handleChatClick = (randomId) => {
    // ログインしている場合のみ遷移
    if(isLoggedIn) {
      navigate("/chat", { state: { randomId } });
    } else {
      onLoginClick();
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
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

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">メッセージ</h2>
            <p>{message}</p>
            <button onClick={closeModal} className="mt-4 bg-blue-500 text-white p-2 rounded">
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
