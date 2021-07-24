const { model, Schema } = require('mongoose');

const CarrosSchema = new Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    año: {
      type: Number,
      trim: true,
      required: true,
    },
    marca: {
      type: String,
      trim: true,
      required: true,
    },
    especificaciones: {
      type: String,
      trim: true,
      required: true,
    },
    precio: {
      type: Number,
      trim: true,
      required: true,
    },
    fabricanteId: {
      type: Schema.Types.ObjectId,
      ref: 'Fabricante',
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);
module.exports = model('Carro', CarrosSchema);
