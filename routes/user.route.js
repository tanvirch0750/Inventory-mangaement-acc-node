const express = require('express');
const { signup, login, getMe } = require('../controllers/user.controller');
const verifyTokenMiddleware = require('../middlewares/verifyToken.middleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', verifyTokenMiddleware, getMe);

module.exports = router;
