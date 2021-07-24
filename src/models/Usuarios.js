const { model, Schema } = require('mongoose');

const usuariosSchema = new Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    clave: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);
module.exports = model('Usuario', usuariosSchema);
