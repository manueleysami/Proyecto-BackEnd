const express = require('express');
const { body } = require('express-validator');
const FabricanteController = require('../controllers/fabricantesController');
const router = express.Router();
const ctrl = new FabricanteController();

router.get('/agregar', ctrl.getFabricantesAgregarController);
router.get('/', ctrl.getFabricantesObtenerController);
router.get('/editar/:id', ctrl.getFabricantesObtenerIdController);
router.use('/eliminar/:id', ctrl.deleteFabricantesEliminarController);

/* Sanitizar los campos  */
router.post(
  '/insertar',
  [body('rif').notEmpty().trim()],
  [body('nombre').notEmpty().trim()],
  [body('telefono').notEmpty().trim().isNumeric()],
  [body('direccion').notEmpty().trim()],
  [body('contacto').notEmpty().trim()],
  ctrl.postFabricantesInsertarController
);
router.put(
  '/actualizar/',
  [body('rif').notEmpty().trim()],
  [body('nombre').notEmpty().trim()],
  [body('telefono').notEmpty().trim().isNumeric()],
  [body('direccion').notEmpty().trim()],
  [body('contacto').notEmpty().trim()],
  ctrl.putFabricantesActualizatController
);
module.exports = router;
