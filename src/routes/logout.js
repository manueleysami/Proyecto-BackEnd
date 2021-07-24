const express = require('express');
const LogoutController = require('../controllers/logoutController');
const router = express.Router();

router.get('/', LogoutController.logout);

module.exports = router;
