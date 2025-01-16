const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getChatList,getChatMessages } = require('../controllers/chatController');

// チャット情報取得ルート
router.post('/chat', verifyToken, getChatMessages);
router.post('/list', verifyToken, getChatList);

module.exports = router;
