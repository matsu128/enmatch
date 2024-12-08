import React from "react";

const UserCard = ({ user }) => {
  // 日本語ラベルとキーのマッピングを作成
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

  return (
    <div className="user-card">
      <h3>ユーザー情報</h3>
      {userFields.map((field, index) => (
        <p key={index}>
          <strong>{field.label}:</strong>{" "}
          {user[field.key] || "N/A"}
        </p>
      ))}
    </div>
  );
};

export default UserCard;
