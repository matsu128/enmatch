const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// ログインAPIのルート
router.post('/login', login);

module.exports = router;
