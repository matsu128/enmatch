import React, { useState } from "react";

const UserCard = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false); // 自身の状態管理

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
  const initialFields = ["name", "language"];

  return (
    <div
      className={`relative transition-transform transform duration-300 ease-in-out ${
        isExpanded ? "scale-105 shadow-lg" : "shadow-md"
      } border border-gray-300 rounded-lg p-4 bg-white hover:scale-105`}
      onClick={() => setIsExpanded(!isExpanded)} // 自分自身の展開/折りたたみを制御
    >
      {userFields.map((field, index) => {
        if (!isExpanded && !initialFields.includes(field.key)) {
          return null; // 初期表示時は名前と言語以外を非表示
        }
        return (
          <p key={index} className="text-sm text-gray-700 mb-1">
            <strong>{field.label}:</strong> {user[field.key] || "N/A"}
          </p>
        );
      })}
    </div>
  );
};

export default UserCard;
