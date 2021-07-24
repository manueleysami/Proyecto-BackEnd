const { Router } = require('express');
const { body } = require('express-validator');
const ClienteController = require('../controllers/clientesController');
const router = Router();
const ctrl = new ClienteController();

router.get('/', ctrl.getClientesController);
router.get('/agregar', ctrl.getClientesAgregarController);
router.get('/editar/:id', ctrl.getClientesEditarController);
router.use('/eliminar/:id', ctrl.deleteClientesController);

router.post(
  '/insertar',
  [body('cedula').notEmpty().trim().isNumeric()],
  [body('nombre').notEmpty().trim()],
  [body('telefono').notEmpty().trim().isNumeric()],
  [body('direccion').notEmpty().trim()],
  ctrl.postClientesAgregarController
);
router.put(
  '/actualizar/',
  [body('cedula').notEmpty().trim().isNumeric()],
  [body('nombre').notEmpty().trim()],
  [body('telefono').notEmpty().trim().isNumeric()],
  [body('direccion').notEmpty().trim()],
  ctrl.putClientesActualizarController
);

module.exports = router;
