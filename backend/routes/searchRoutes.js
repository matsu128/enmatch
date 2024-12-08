const express = require('express');
const router = express.Router();
const { searchUsers } = require('../controllers/searchController');

// ユーザー検索エンドポイント
router.post('/search', searchUsers);

// 絞り込みエンドポイント
router.post('/filter', searchUsers);


module.exports = router;
