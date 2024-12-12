import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const userFields = [
    { label: "名前", key: "name" },
    { label: "プログラミング言語", key: "language" },
    { label: "経験", key: "experience" },
  ];

  const handleChatClick = (e) => {
    e.stopPropagation();
    navigate("/chat");
  };

  return (
    <div
      className={`p-4 border rounded-lg shadow-md ${
        isExpanded ? "bg-gray-100" : ""
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {userFields.map((field) => (
        <div key={field.key}>
          <strong>{field.label}: </strong>
          {user[field.key]}
        </div>
      ))}
      {isExpanded && (
        <button
          onClick={handleChatClick}
          className="mt-4 bg-blue-500 text-white py-1 px-3 rounded"
        >
          チャット
        </button>
      )}
    </div>
  );
};

export default UserCard;
