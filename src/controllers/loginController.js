const Usuario = require('../models/Usuarios');
const bcrtpt = require('bcrypt');
class LoginController {
  getController(req, res) {
    res.render('login/login');
  }
  async postController(req, res, next) {
    const { usuario, clave } = req.body;
    if (!usuario || !clave) {
      res.render('login/login', {
        error: 'Los datos solicitados son necesarios',
      });
      return;
    }
    try {
      const usuarioEncontrado = await Usuario.findOne({ nombre: usuario });
      if (!usuarioEncontrado) {
        res.render('login/login', {
          error: 'Este usuario no esta registrado',
        });
        return;
      }
      const claveHash = usuarioEncontrado.clave;
      const response = await bcrtpt.compare(clave, claveHash);
      if (!response) {
        res.render('login/login', {
          error: 'la contraseña no es correcta',
        });
        return;
      }
      req.session.loggedin = true;
      req.session.usuario = usuarioEncontrado.nombre;
      res.redirect('/carros');
      return;
    } catch (error) {
      res.render('login/login', {
        error: 'Ha ocurrido un error en el server',
      });
      return;
    }
  }
}
module.exports = LoginController;
