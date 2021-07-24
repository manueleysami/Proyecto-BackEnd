const Fabricante = require('../models/Fabricantes');

class FabricanteController {
  getFabricantesAgregarController(req, res) {
    res.render('fabricantes/agregar');
  }
  getFabricantesObtenerController(req, res) {
    Fabricante.find()
      .then((fabricantes) => {
        res.render('fabricantes/ver', {
          fabricantes,
        });
      })
      .catch((e) => {
        req.flash('error', 'No se pudo obtener los datos');
        res.status(500).redirect('/clientes');
      });
  }
  getFabricantesObtenerIdController(req, res) {
    const { id } = req.params;
    Fabricante.findById({ _id: id })
      .then((fabricante) => {
        if (!fabricante) {
          res.redirect('/fabricantes');
          return;
        }
        res.render('fabricantes/editar', {
          fabricante,
        });
      })
      .catch((e) => {
        res.status(500).redirect('/fabricantes');
      });
  }
  deleteFabricantesEliminarController(req, res) {
    const { id } = req.params;
    Fabricante.findByIdAndDelete({ _id: id })
      .then((response) => {
        if (!response) {
          req.flash('error', 'Id no encontrado');
          res.redirect('/fabricantes');
          return;
        }
        req.flash('exito', 'Fabricante eliminado de la Concesionaria');
        res.redirect('/fabricantes');
        return;
      })
      .catch((e) => {
        return res.status(500).redirect('/fabricantes');
      });
  }
  postFabricantesInsertarController(req, res) {
    const { rif, nombre, telefono, direccion, contacto } = req.body;
    if (!rif || !nombre || !telefono || !direccion || !contacto) {
      req.flash('error', 'Todos los campos son obligatorios');
      res.redirect('/fabricantes/agregar');
      return;
    }
    const nuevoFabricante = new Fabricante({
      rif,
      nombre,
      telefono,
      direccion,
      contacto,
    });
    nuevoFabricante
      .save()
      .then(() => {
        req.flash('exito', 'Fabricante agregado exitosamente');
        res.redirect('/fabricantes');
      })
      .catch((e) => {
        res.status(500).redirect('/fabricantes');
      });
  }
  putFabricantesActualizatController(req, res) {
    const { id, rif, nombre, telefono, direccion, contacto } = req.body;
    if (!nombre || !telefono || !direccion || !id || !contacto) {
      req.flash('error', 'Todos los datos son necesarios para actualizar');
      return res.redirect('/fabricantes');
    }
    Fabricante.findByIdAndUpdate(
      { _id: id },
      { rif, nombre, telefono, direccion, contacto }
    )
      .then(() => {
        req.flash('exito', 'Fabricante actualizado correctamente');
        res.redirect('/fabricantes');
      })
      .catch((e) => {
        res.status(500).redirect('/');
      });
  }
}
module.exports = FabricanteController;
