const Carro = require('../models/Carros');
const Fabricante = require('../models/Fabricantes');
class CarrosController {
  async getCarrosController(req, res) {
    try {
      const carros = await Carro.find();
      res.status(200).render('carros/ver', {
        carros,
      });
    } catch (error) {
      res.render('carros/ver', {
        carros,
        error: 'Ha ocurrido un error inesperado',
      });
    }
  }
  async getCarrosAgregarController(req, res, next) {
    try {
      const fabricantes = await Fabricante.find();
      res.status(200).render('carros/agregar', {
        fabricantes,
      });
    } catch (error) {
      res.status(500).render('carros/agregar', {
        fabricantes,
        error: 'Ha ocurrido un erroeer obteniendo los fabricantes',
      });
    }
  }
  async postCarrosAgregarController(req, res) {
    const fabricantes = await Fabricante.find();
    const { nombre, año, marca, especificaciones, precio } = req.body;
    if (!nombre || !año || !marca || !especificaciones || !precio) {
      res.render('carros/agregar', {
        error: 'Todos los datos son necesarios',
        fabricantes,
      });
      return;
    }
    try {
      const fabricanteDatos = await Fabricante.findOne({ nombre: marca });
      if (!fabricanteDatos) {
        res.render('carros/agregar', {
          error: 'No existe este fabricante',
          fabricantes,
        });
        return;
      }
      const { id } = fabricanteDatos;
      const nuevoFabricante = await Carro.create({
        nombre,
        año,
        marca,
        especificaciones,
        precio,
        fabricanteId: id,
      });
      await nuevoFabricante.save();
      req.flash('exito', 'Carro agregado correctamente');
      res.status(201).redirect('/carros');
    } catch (error) {
      res.status(500).render('carros/agregar', {
        error: 'Ha ocurrido un error al insertar el carro en la base de datos',
        fabricantes,
      });
    }
  }
  async getCarrosObtenerIdController(req, res) {
    const carroInfo = await Carro.findById({ _id: req.params.id });
    const fabricantes = await Fabricante.find();
    if (!carroInfo) {
      res.status(204).redirect('/carros');
      return;
    }
    const carro = {
      id: carroInfo._id,
      nombre: carroInfo.nombre,
      año: carroInfo.año,
      marca: carroInfo.marca,
      especificaciones: carroInfo.especificaciones,
      precio: carroInfo.precio,
    };
    res.status(200).render('carros/editar', {
      carro,
      fabricantes,
    });
  }
  async deleteCarrosEliminarController(req, res) {
    const { id } = req.params;
    Carro.findByIdAndDelete({ _id: id })
      .then((carro) => {
        if (!carro) {
          req.flash('error', 'El id del carro no existe');
          res.redirect('/carros');
          return;
        }
        req.flash('exito', 'Carro eliminado correctamente');
        res.status(200).redirect('/carros');
      })
      .catch(() => {
        res.status(500).redirect('/carros');
      });
  }
  async putCarrosActualizarController(req, res) {
    const { id, nombre, año, marca, especificaciones, precio } = req.body;
    if (!nombre || !año || !marca || !especificaciones || !precio) {
      req.flash('error', 'Todos los campos son necesarios para actualizar');
      res.redirect('/carros');
      return;
    }
    try {
      const fabricanteDatos = await Fabricante.findOne({ nombre: marca });
      if (!fabricanteDatos) {
        res.render('carros/agregar', {
          error: 'No existe este fabricante',
          fabricantes,
        });
        return;
      }
      const { id: fabricanteId } = fabricanteDatos;
      await Carro.update(
        { _id: id },
        { nombre, año, marca, especificaciones, precio, fabricanteId }
      );
      req.flash('exito', 'Carro actualizado correctamente');
      res.redirect('/carros');
    } catch (error) {
      res.status(500).redirect('/carros');
    }
  }
}
module.exports = CarrosController;
