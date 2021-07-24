const Usuario = require('../models/Usuarios');
const bcrypt = require('bcrypt');

class RegistroController {
  getRegistro(req, res) {
    res.render('registrarse/agregar');
  }
  async postRegistro(req, res) {
    const { usuario, clave, repetir } = req.body;
    if (!usuario || !clave || !repetir) {
      res.render('registrarse/agregar', {
        error: 'Los datos solicitados son necesarios',
      });
      return;
    }
    if (clave.length <= 5) {
      res.render('registrarse/agregar', {
        error: 'Las contraseñas deben tener minimo 6 caracteres',
        usuario,
        clave,
        repetir,
      });
      return;
    } else {
      if (clave !== repetir) {
        res.render('registrarse/agregar', {
          error: 'Las contraseñas no coinciden',
          usuario,
          clave,
          repetir,
        });
        return;
      }
    }
    const usuarioEncontrado = await Usuario.findOne({ nombre: usuario });
    if (usuarioEncontrado) {
      res.render('registrarse/agregar', {
        error: 'Este usuario se encuentra registrado',
      });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const nuevaClave = await bcrypt.hash(clave, salt);
    try {
      const usuarioRegistro = new Usuario({
        nombre: usuario,
        clave: nuevaClave,
      });
      await usuarioRegistro.save();
      res.redirect('/login');
    } catch (error) {
      res.render('registrarse/agregar', {
        error: 'Ha ocurrido un error',
        usuario,
        clave,
        repetir,
      });
      return;
    }
  }
}

module.exports = RegistroController;
