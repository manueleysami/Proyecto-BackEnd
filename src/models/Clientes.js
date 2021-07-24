const { model, Schema } = require('mongoose');

const clienteSchema = new Schema(
  {
    cedula: {
      type: Number,
      trim: true,
      required: true,
    },
    nombre: {
      type: String,
      trim: true,
      required: true,
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
  },
  {
    timestamps: false,
    versionKey: false,
  }
);
module.exports = model('Cliente', clienteSchema);
