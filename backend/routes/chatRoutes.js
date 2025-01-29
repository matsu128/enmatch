const express = require('express');
const router = express.Router();
const { getChatList, getChatMessages } = require('../controllers/chatController');

// チャット情報取得ルート
router.post('/chat', getChatMessages);
router.post('/list', getChatList);

module.exports = router;
