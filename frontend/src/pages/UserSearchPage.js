import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CategoryFilter from "../organisms/CategoryFilter";
import UserList from "../organisms/UserList";
import Button from "../atoms/Button";

// ベースURLの設定
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const UserSearchPage = ({ onLoginClick }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    language: [],
    framework: [],
    librarie: [],
    db: [],
    environment: [],
    experience: [],
    time_commit: [],
    motivation: [],
  });
  
  // sessionStorageからrandomIdを取得してログイン状態を判定
  const isLoggedIn = !!sessionStorage.getItem("randomId");
  const navigate = useNavigate(); // navigate関数を使用

  // 初期データの取得
  useEffect(() => {
    const fetchUsers = async () => {
      // コメントアウトされた本番用データ取得コード
      try {
        const response = await axios.post("api/search/search", {});
        const data = response.data?.initialData || []; // データが無い場合に空配列を設定
        setUsers(data);
        setFilteredUsers(data); // 初期データをそのまま表示
        applyFilters(data); // 初期表示時もフィルター適用処理を実施
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };
    fetchUsers();
  }, []);

  // フィルターの適用処理
  const applyFilters = async () => {

    // コメントアウトされた本番用フィルター処理コード
    try {
      const response = await axios.post("/api/search/filter", {
        filters: selectedFilters,
      });
      const data = Array.isArray(response.data?.filteredData) ? response.data.filteredData : [];
      setFilteredUsers(data);
    } catch (error) {
      console.error("フィルター適用中にエラーが発生しました:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mt-8 mb-4">ユーザー検索</h1>
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <Button
            type="button"
            label="チャット画面へ"
            onClick={() => navigate("/chat")}
            className="bg-yellow-300 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          />
        )}
      </div>
      <CategoryFilter
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      {/* フィルターを適用ボタン */}
      <Button
        type="button"
        label="フィルターを適用"
        onClick={applyFilters}
        className="mt-8 w-full max-w-xs bg-yellow-300 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      />
      <UserList users={filteredUsers} onLoginClick={onLoginClick} />
    </div>
  );
};

export default UserSearchPage;
