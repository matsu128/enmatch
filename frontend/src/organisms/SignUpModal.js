import React, { useState } from "react";
import axios from "axios";
import Button from "../atoms/Button";
import { CloudDownloadIcon } from "@heroicons/react/solid";

const SignUpModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const validateInputs = () => {
    const errors = {};
    if (!email.trim()) errors.email = "メールアドレスを入力してください。";
    if (!password.trim()) errors.password = "パスワードを入力してください。";
    if (!name.trim()) errors.name = "名前を入力してください。";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const signUpSubmitHandler = async () => {
    if (!validateInputs()) return;

    const payload = {
      email: email.trim(),
      password: password.trim(),
      name: name.trim(),
    };

    if (icon) payload.icon = icon;

    try {
      const response = await axios.post("/api/auth/signup", payload);

      const { randomId, user } = response.data;
      // sessionStorage に認証情報を保存
      sessionStorage.setItem('randomId', randomId);
      sessionStorage.setItem('user', JSON.stringify(user));
      onClose();
      window.location.reload(); // ページをリロード
    } catch (err) {
      setError(err.response?.data?.message || "新規登録に失敗しました。");
    }
  };

  const handleIconUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setIcon(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleIconDelete = () => setIcon("");

  return (
    <div className="flex h-full flex-1 flex-col p-0">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-16 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          新規作成
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center space-x-4 mt-8">
            <div
              className="w-16 h-16 rounded-full border border-gray-300 overflow-hidden flex items-center justify-center relative group cursor-pointer"
              role="button"
              onClick={() => document.getElementById("icon-upload").click()}
            >
              {icon ? (
                <>
                  <img
                    src={icon}
                    alt="icon"
                    className="w-full h-full object-cover"
                  />
                </>
              ) : (
                <CloudDownloadIcon className="w-8 h-8 text-gray-500" />
              )}
              <input
                id="icon-upload"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleIconUpload}
              />
              <div className="absolute inset-0 rounded-full bg-gray-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-base font-medium text-gray-700"
              >
                名前
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-400 mt-1 block w-full rounded-md shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base"
              />
              {validationErrors.name && (
                <p className="text-red-500">{validationErrors.name}</p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700"
            >
              メールアドレス
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 mt-1 block w-full rounded-md shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base"
            />
            {validationErrors.email && (
              <p className="text-red-500">{validationErrors.email}</p>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              パスワード
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 mt-1 block w-full rounded-md shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base"
            />
            {validationErrors.password && (
              <p className="text-red-500">{validationErrors.password}</p>
            )}
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="mt-8">
            <Button
              type="button"
              label="サインアップ"
              onClick={signUpSubmitHandler}
              className="w-full bg-yellow-300 mt-16 mb-16 text-white py-2 px-4 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
