import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryFilter from "../organisms/CategoryFilter";
import UserList from "../organisms/UserList";
import Button from "../atoms/Button";

// front開発用のdummy data
import dummyData from "./dummyData";

// ベースURLの設定
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const UserSearchPage = () => {
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

  // 初期データの取得
  useEffect(() => {
    const fetchUsers = async () => {
      console.log("初期データ取得開始");
      console.log("リクエストURL:", process.env.REACT_APP_API_URL + "/api/search/search");

      // コメントアウトされた本番用データ取得コード
      // try {
      //   const response = await axios.post("/api/search/search", {});
      //   const data = response.data?.initialData || []; // データが無い場合に空配列を設定
      //   setUsers(data);
      //   setFilteredUsers(data); // 初期データをそのまま表示
      // } catch (error) {
      //   console.error("データの取得に失敗しました:", error);
      // }

      // front開発用のdummy dataを使用
      console.log("front開発用: dummyDataを使用");
      setUsers(dummyData);
      setFilteredUsers(dummyData);
    };
    fetchUsers();
  }, []);

  // フィルターの適用処理
  const applyFilters = async () => {
    console.log("フィルターを適用");

    // コメントアウトされた本番用フィルター処理コード
    // try {
    //   const response = await axios.post("/api/search/filter", {
    //     filters: selectedFilters,
    //   });
    //   const data = Array.isArray(response.data?.filteredData) ? response.data.filteredData : [];
    //   setFilteredUsers(data);
    // } catch (error) {
    //   console.error("フィルター適用中にエラーが発生しました:", error);
    // }

    // front開発用のdummy dataを使用してフィルタリング
    const filtered = dummyData.filter((user) =>
      Object.keys(selectedFilters).every(
        (key) =>
          selectedFilters[key].length === 0 ||
          selectedFilters[key].some((filter) => user[key]?.includes(filter))
      )
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mt-8 mb-4">ユーザー検索</h1>
      <CategoryFilter
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      {/* フィルターを適用ボタン */}
      <Button
        type="button"
        label="フィルターを適用"
        onClick={applyFilters}
        className="mt-8 w-full max-w-xs bg-gradient-to-r from-teal-400 to-teal-300 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      />
      <UserList users={filteredUsers} />
    </div>
  );
};

export default UserSearchPage;
