class Middleware {
  static auth(req, res, next) {
    if (!req.session.loggedin) {
      res.redirect("/login");
      return;
    }
    next();
  }
  static sessionActiva(req, res, next) {
    if (req.session.usuario) {
      res.locals.usuario = req.session.usuario;
    }
    next();
  }
  static sessionFlash(req, res, next) {
    res.locals.exito = req.flash("exito");
    res.locals.errorMsg = req.flash("error");
    next();
  }
}
module.exports = Middleware;
