import React, { useState, useContext } from "react";
import UserCard from "../molecules/UserCard";
import { useNavigate } from "react-router-dom";

const UserList = ({ users, onLoginClick }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 確認モーダル表示用
  const [pendingAction, setPendingAction] = useState(null); // 実行待ちのアクション
  const navigate = useNavigate();

  // sessionStorageからrandomIdを取得してログイン状態を判定
  const isLoggedIn = !!sessionStorage.getItem("randomId");

  // ユーザーカードがクリックされたときの処理
  const handleCardClick = (userId) => {
    setSelectedUser(userId === selectedUser ? null : userId);
  };

  // チャットボタンがクリックされたときの処理
  const handleChatClick = (randomId) => {
    if (isLoggedIn) {
      navigate("/chat", { state: { randomId, chatJudge: true } });
    } else {
      // モーダルを表示し、ログイン確認
      setPendingAction(() => () => onLoginClick());
      setShowConfirmModal(true);
    }
  };

  // モーダルを閉じる
  const closeModal = () => {
    setShowConfirmModal(false);
    setPendingAction(null);
  };

  // モーダルで「はい」を選択したときの処理
  const handleConfirm = () => {
    if (pendingAction) pendingAction(); // 保留中のアクションを実行
    closeModal();
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

      {/* 確認モーダル */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20"
          onClick={closeModal}
        >
          <div
            className="bg-white px-8 rounded-lg shadow-2xl transform transition-all duration-300 scale-105 max-w-[90vw] max-h-[90vh] sm:h-[300px] lg:w-[400px] lg:h-[300px] w-96 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()} // 背景クリックで閉じないようにする
          >
            <h2 className="text-2xl font-semibold text-gray-800 text-center mt-6">
              ログインしますか？
            </h2>
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={handleConfirm}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                はい
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
