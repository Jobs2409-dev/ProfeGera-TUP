// controllers/auth.controller.js
import { Usuario } from '../models/Usuario.js';
import jwt from 'jsonwebtoken';

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


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const usuario = await Usuario.findOne({ email });
        if(!usuario) {
            return res.status(404).json({ mensaje: 'Credenciales inválidas.' });
        }

        const passwordCorrecto = await usuario.comparePassword(password);
        if(!passwordCorrecto) {
            return res.status(404).json({ mensaje: 'Credenciales inválidas.' });
        }

        const payload = {
            id: usuario._id,
            rol: usuario.rol
        }

        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        
        );

        res.status(200).json({
            mensaje: 'Login exitoso',
            token: token
        });

    } catch (error) {
    console.error('Error detallado en login:', error);

    res.status(500).json({ mensaje: 'Error en el servidor', detalle: error.message }); 
    }
}