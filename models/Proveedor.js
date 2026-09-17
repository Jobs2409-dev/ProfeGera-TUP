import mongoose from 'mongoose';

const proveedorSchema = new mongoose.Schema(
  {
    razonsocial: {
      type: String,
      required: [true, 'La razón social es obligatoria.'],
      trim: true,
      uppercase: true,
    },
    cuil: {
      type: String,
      required: [true, 'El CUIL es obligatorio.'],
      unique: true,
      match: [/^\d{11}$/, 'El CUIL debe tener 11 dígitos.'],
    },
    contacto: {
      email: {
        type: String,
        required: true,
        lowercase: true,
      },
      telefono: String,
    },
    categorias: [
      {
        type: String,
        enum: ['Hardware', 'Software', 'Insumo', 'Servicio'],
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Proveedor = mongoose.model('Proveedor', proveedorSchema);