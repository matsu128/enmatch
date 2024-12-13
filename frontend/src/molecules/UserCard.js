// src/molecules/UserCard.js
import React, { useState } from "react";
import Button from "../atoms/Button";

const UserCard = ({ user, onClick, isSelected, handleChatClick }) => {
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

  const initialFields = ["name", "language", "experience"];

  return (
    <div
      className={`relative transition-transform transform duration-300 ease-in-out ${
        isSelected ? "scale-105 shadow-lg" : "shadow-md"
      } border border-gray-300 rounded-lg p-4 bg-white hover:scale-105 hover:shadow-xl cursor-pointer`}
      onClick={onClick}
    >
      {userFields.map((field, index) => {
        if (!initialFields.includes(field.key) && !isSelected) {
          return null;
        }

        return (
          <div key={index} className="mb-2">
            <p className="text-sm text-gray-700">
              <strong>{field.label}:</strong> {user[field.key] || "N/A"}
            </p>
            {isSelected && field.key === "motivation" && (
              <div className="mt-3 flex justify-center w-full">
                <Button onClick={handleChatClick} label="チャット" className="bg-gradient-to-r from-gray-700 to-gray-900" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserCard;
