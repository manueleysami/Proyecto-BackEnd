const express = require('express');
const LoginController = require('../controllers/loginController');
const { body } = require('express-validator');
const router = express.Router();
const ctrl = new LoginController();

router.get('/', ctrl.getController);
router.post(
  '/login',
  [body('usuario').notEmpty().trim().isLowercase().isString()],
  [body('clave').notEmpty().trim()],
  ctrl.postController
);

module.exports = router;
