const Cliente = require('../models/Clientes');

class ClienteController {
  getClientesController(req, res) {
    Cliente.find()
      .then((clientes) => {
        res.status(200).render('clientes/ver', {
          clientes,
        });
      })
      .catch((e) => {
        res.status(500).redirect('/carros');
      });
  }
  getClientesAgregarController(req, res) {
    res.render('clientes/agregar');
  }
  deleteClientesController(req, res) {
    const { id } = req.params;
    Cliente.findByIdAndDelete({ _id: id })
      .then((cliente) => {
        if (!cliente) {
          req.flash('error', 'Id no encontrado');
          res.redirect('/clientes');
          return;
        }
        req.flash('exito', 'Cliente eliminado correctamente');
        res.redirect('/clientes');
      })
      .catch((e) => {
        res.status(500).redirect('/clientes');
      });
  }
  getClientesEditarController(req, res) {
    const { id } = req.params;
    Cliente.findById({ _id: id })
      .then((cliente) => {
        if (!cliente) {
          res.redirect('/clientes');
          return;
        }
        res.status(200).render('clientes/editar', {
          cliente,
        });
      })
      .catch((e) => {
        res.status(500).redirect('/clientes');
      });
  }
  postClientesAgregarController(req, res) {
    const { cedula, nombre, telefono, direccion } = req.body;
    if (!cedula || !nombre || !telefono || !direccion) {
      req.flash('error', 'Todos los campos son necesarios');
      res.redirect('/clientes/agregar');
      return;
    }
    const nuevoCliente = new Cliente({
      cedula,
      nombre,
      telefono,
      direccion,
    });
    nuevoCliente
      .save()
      .then(() => {
        req.flash('exito', 'Cliente añadido correctamente');
        res.status(201).redirect('/clientes');
      })
      .catch((e) => {
        res.status(500).redirect('/clientes');
      });
  }
  putClientesActualizarController(req, res) {
    const { id, cedula, nombre, telefono, direccion } = req.body;
    if (!nombre || !telefono || !direccion || !id) {
      req.flash('error', 'Todos los campos son necesarios para actualizar');
      return res.redirect('/clientes');
    }
    Cliente.findByIdAndUpdate(
      { _id: id },
      { cedula, nombre, telefono, direccion }
    )
      .then(() => {
        req.flash('exito', 'Cliente actualizado correctamente');
        res.status(201).redirect('/clientes');
      })
      .catch((e) => {
        res.redirect('/clientes');
        return;
      });
  }
}
module.exports = ClienteController;
