const mongoose = require('mongoose');
class Database {
  async conectarBd() {
    try {
      const opcionesMongo = {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      };
      await mongoose.connect(process.env.URI, opcionesMongo);
      console.log('Base de datos conectada correctamente');
    } catch (error) {
      console.log('Error conectandose a la BD', error);
    }
  }
}
module.exports = new Database()