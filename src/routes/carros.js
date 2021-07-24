const express = require('express');
const CarrosController = require('../controllers/carrosController');
const { body } = require('express-validator');
const router = express.Router();
const ctrl = new CarrosController();

router.get('/', ctrl.getCarrosController);
router.get('/agregar', ctrl.getCarrosAgregarController);
router.get('/editar/:id', ctrl.getCarrosObtenerIdController);
router.use('/eliminar/:id', ctrl.deleteCarrosEliminarController);

router.post(
  '/insertar',
  [body('nombre').notEmpty().trim()],
  [body('año').notEmpty().trim().isNumeric()],
  [body('marca').notEmpty()],
  [body('especificaciones').notEmpty().trim()],
  [body('precio').notEmpty().trim().isNumeric()],
  ctrl.postCarrosAgregarController
);
router.put(
  '/actualizar/',
  [body('nombre').notEmpty().trim()],
  [body('año').notEmpty().trim().isNumeric()],
  [body('marca').notEmpty()],
  [body('especificaciones').notEmpty().trim()],
  [body('precio').notEmpty().trim().isNumeric()],
  ctrl.putCarrosActualizarController
);

module.exports = router;
