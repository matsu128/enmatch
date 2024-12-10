import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false); // 自身の状態管理
  const [isSelected, setIsSelected] = useState(false); // ユーザーが選択されたかどうか
  const navigate = useNavigate(); // useNavigate を使用して遷移処理

  // 日本語ラベルとキーのマッピング
  const userFields = [
    { label: "名前", key: "name" },
    { label: "プログラミング言語", key: "language" },
    { label: "フレームワーク", key: "framework" },
    { label: "ライブラリ", key: "librarie" },
    { label: "データベース", key: "db" },
    { label: "環境", key: "environment" },
    { label: "経験", key: "experience" },
    { label: "コミット可能時間", key: "time_commit" },
    { label: "モチベーション", key: "motivation" },
  ];

  // 初期表示のフィールド（名前とプログラミング言語）
  const initialFields = ["name", "language", "experience"];

  // チャットボタンを押したときに遷移
  const handleChatClick = (e) => {
    e.stopPropagation(); // ボタンのクリックで親の onClick をトリガーしないようにする
    navigate("/chat"); // チャットページに遷移
  };

  return (
    <div
      className={`relative transition-transform transform duration-300 ease-in-out ${
        isExpanded ? "scale-105 shadow-lg" : "shadow-md"
      } border border-gray-300 rounded-lg p-4 bg-white hover:scale-105 hover:shadow-xl cursor-pointer`} 
      onClick={() => {
        setIsExpanded(!isExpanded); 
        setIsSelected(!isSelected); // クリックで選択状態を切り替え
      }} 
    >
      {userFields.map((field, index) => {
        if (!isExpanded && !initialFields.includes(field.key)) {
          return null; // 初期表示時は名前と言語以外を非表示
        }

        return (
          <div key={index} className="mb-2">
            <p className="text-sm text-gray-700">
              <strong>{field.label}:</strong> {user[field.key] || "N/A"}
            </p>
            {/* チャットボタン（選択されたユーザーのみ表示） */}
            {isSelected && field.key === "motivation" && (
              <div className="mt-3 flex justify-center w-full">
                <button
                  onClick={handleChatClick}
                  className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-2xl focus:outline-none"
                >
                  チャット
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserCard;
