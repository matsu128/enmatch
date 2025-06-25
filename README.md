# Enmatch - Project Matching Platform

---

## 概要 / Overview

`Enmatch`は、プロジェクトを立ち上げたいユーザーと、スキルを持つ開発者やデザイナーを繋げるためのマッチングプラットフォームです。  
ユーザーはプロジェクトを作成し、そのプロジェクトに必要なIssue（タスク）を定義できます。他のユーザーはプロジェクトやユーザーを検索し、チャットを通じてコミュニケーションを取り、プロジェクトに参加することができます。

`Enmatch` is a matching platform designed to connect users who want to launch projects with skilled developers and designers.  
Users can create projects and define necessary issues (tasks) within those projects. Other users can search for projects or users, communicate through chat, and join projects.

---

## ✨ 主な機能 / Key Features

- **ユーザー認証 / User Authentication**:  
  - メールアドレスとパスワードによるサインアップ・ログイン機能  
  - セッション管理  
  Sign-up and login with email and password  
  Session management

- **プロジェクト管理 / Project Management**:  
  - プロジェクトの作成（概要、詳細）  
  - プロジェクト内のIssue（タスク）作成・管理  
  - AIによるIssueの品質・粒度チェック機能  
  Create projects (summary and details)  
  Create and manage issues (tasks) within projects  
  AI-based issue quality and granularity checks

- **マッチング機能 / Matching Features**:  
  - プロジェクト検索  
  - ユーザー検索（スキルやカテゴリによるフィルタリング）  
  Project search  
  User search with skill and category filtering

- **コミュニケーション / Communication**:  
  - Socket.IOを利用したリアルタイムチャット機能  
  Real-time chat using Socket.IO

- **マイページ / My Page**:  
  - プロフィール情報の確認・編集  
  View and edit profile information

---

## 🛠️ 技術スタック / Technology Stack

### フロントエンド / Frontend

- **フレームワーク / Framework**: [React](https://reactjs.org/)  
- **ルーティング / Routing**: [React Router](https://reactrouter.com/)  
- **UI/スタイリング / UI & Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **アニメーション / Animation**: [Framer Motion](https://www.framer.com/motion/)  
- **状態管理 / State Management**: React Context API, `useState`, `useEffect`  
- **HTTPクライアント / HTTP Client**: [Axios](https://axios-http.com/)  
- **アイコン / Icons**: [Lucide React](https://lucide.dev/)  

### バックエンド / Backend

- **ランタイム / Runtime**: [Node.js](https://nodejs.org/)  
- **フレームワーク / Framework**: [Express.js](https://expressjs.com/)  
- **ORM**: [Prisma](https://www.prisma.io/)  
- **データベース / Database**: PostgreSQL (estimated)  
- **インメモリDB / In-Memory DB**: [Redis](https://redis.io/) (for chat and session management)  
- **リアルタイム通信 / Real-time Communication**: [Socket.IO](https://socket.io/)  
- **プロセス管理 / Process Manager**: [PM2](https://pm2.keymetrics.io/)  

---

## 📂 プロジェクト構成 / Project Structure

### フロントエンド (`/frontend`)

Atomic Designの思想に基づいてコンポーネントを管理しています。  
Components are managed based on the Atomic Design principles.

frontend/
- src/
- atoms/ # Button, Inputなど最小単位のコンポーネント / Smallest components like Button, Input
- molecules/ # atomsを組み合わせたコンポーネント / Components combining atoms
- organisms/ # Header, Formなど具体的な機能を持つコンポーネント群 / Components with concrete functions like Header, Form
- pages/ # 各ページのコンポーネント / Components for each page
- templates/ # ページのレイアウトテンプレート / Layout templates for pages
- contexts/ # 認証などのグローバルな状態管理 / Global state management like authentication


### バックエンド (`/backend`)

MVCに近い責務分離された構成です。  
A structure with separation of concerns close to MVC.

backend/
- controllers/ # リクエストに対するビジネスロジック / Business logic for requests
- routes/ # URLのエンドポイント定義 / URL endpoint definitions
- middleware/ # 認証などの共通処理 / Common processing like authentication
- prisma/ # データベーススキーマとマイグレーション / Database schema and migrations
- socket/ # Socket.IO関連のロジック / Socket.IO related logic
- config/ # データベース接続情報など / Database connection info etc.


---

## 🚀 セットアップ方法 / Setup Instructions

### 1. 前提条件 / Prerequisites

- [Node.js](https://nodejs.org/) (v16以上 / v16 or above)  
- [npm](https://www.npmjs.com/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [Redis](https://redis.io/)  

### 2. バックエンドのセットアップ / Backend Setup

```bash
# 1. バックエンドディレクトリに移動 / Move to backend directory
cd backend

# 2. 依存関係をインストール / Install dependencies
npm install

# 3. Prismaクライアントを生成 / Generate Prisma client
npx prisma generate

# 4. .envファイルを作成し、環境変数を設定 / Create .env file and set environment variables
cp .env.example .env
# .envファイルにデータベースURLなどを記述 / Add DATABASE_URL, REDIS_URL, JWT_SECRET etc.
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
# REDIS_URL="redis://HOST:PORT"
# JWT_SECRET="your_jwt_secret"

# 5. データベースをマイグレーション / Push DB schema to database
npx prisma db push

# 6. サーバーを起動 / Start the server
npm start

```

### 3. フロントエンドのセットアップ / Frontend Setup
```bash

# 1. フロントエンドディレクトリに移動 / Move to frontend directory
cd frontend

# 2. 依存関係をインストール / Install dependencies
npm install

# 3. .envファイルを作成し、環境変数を設定 / Create .env file and set environment variables
cp .env.example .env
# .envファイルにバックエンドAPIのURLを記述 / Set backend API URL
# REACT_APP_API_URL=http://localhost:5000

# 4. 開発サーバーを起動 / Start development server
npm start

```

- これで、http://localhost:3000でアプリケーションにアクセスできます。
- You can now access the application at http://localhost:3000.

- ライセンス / License
[MIT License](LICENSE)
