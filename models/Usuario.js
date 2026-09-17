import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        enum: ['ADMIN', 'VENDEDOR'], 
        default: 'VENDEDOR'
    }
    
}, {
    timestamps: true,
});

// Hasheo con Salt de la contraseña antes guardada del usuario.
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt); 
        next();
    } catch (error) {
        next(error);
    }
});

// Compara la contraseña ingresada con la almacenada en la BD.
usuarioSchema.methods.comparePassword = async function (passwordIngresado) {
    return await bcrypt.compare(passwordIngresado, this.password);
};

export const Usuario = mongoose.model('Usuario', usuarioSchema);