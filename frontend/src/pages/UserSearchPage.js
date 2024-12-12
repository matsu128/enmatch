import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryFilter from "../organisms/CategoryFilter";
import UserList from "../organisms/UserSearch/UserList";
import Button from "../atoms/Button";

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post("/api/search/search", {}, { withCredentials: true });
        setUsers(response.data?.initialData || []);
        setFilteredUsers(response.data?.initialData || []);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };

    fetchUsers();
  }, []);

  const applyFilters = async () => {
    try {
      const response = await axios.post("/api/search/filter", { filters: selectedFilters });
      setFilteredUsers(response.data?.filteredData || []);
    } catch (error) {
      console.error("フィルター適用中にエラーが発生しました:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mt-8 mb-4">ユーザー検索</h1>
      <CategoryFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      <Button label="フィルターを適用" onClick={applyFilters} />
      <UserList users={filteredUsers} />
    </div>
  );
};

export default UserSearchPage;
