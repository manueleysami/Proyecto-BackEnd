const express = require('express');
const RegistroController = require('../controllers/registroController');
const { body } = require('express-validator');
const router = express.Router();
const ctrl = new RegistroController();

router.get('/', ctrl.getRegistro);
router.post(
  '/insertar',
  [body('usuario').notEmpty().trim().isLowercase().isString()],
  [body('clave').notEmpty().trim()],
  [body('repetir').notEmpty().trim().notEmpty()],
  ctrl.postRegistro
);
module.exports = router;
