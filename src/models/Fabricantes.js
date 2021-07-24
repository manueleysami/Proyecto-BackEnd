const { model, Schema } = require('mongoose');

const fabricanteSchema = new Schema(
  {
    rif: {
      type: Number,
      trim: true,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    telefono: {
      type: Number,
      trim: true,
      required: true,
    },
    direccion: {
      type: String,
      trim: true,
      required: true,
    },
    contacto: {
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
module.exports = model('Fabricante', fabricanteSchema);
