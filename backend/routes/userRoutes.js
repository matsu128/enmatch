const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getUserData } = require('../controllers/UserController');

// ユーザー情報取得ルート
router.get('/user', verifyToken, getUserData);

module.exports = router;
