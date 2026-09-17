import { Usuario } from '../models/Usuario.js';

export const registrasUsuario = async (req, res) => {
    try {
        const { email, password, rol } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: 'El email y la contraseña son obligatorios'
            });
        }

        const usuario = await Usuario.create({ email, password, rol });
        res.status(201).json({
            mensaje: 'Usuario registrado',
            usuario: {
                id: usuario._id,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error('Error al registrar el usuario:', error.message);

        if (error.code === 11000) {
            return res.status(409).json({ mensaje: 'El email ya está registrado' });
        }

        res.status(400).json({
            mensaje: 'Error al registrar el usuario',
            detalle: error.message
        });
    }
};
