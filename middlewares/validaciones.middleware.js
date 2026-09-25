// middlewares\validaciones.middleware.js
import { body, param } from 'express-validator';
import { validarCampos } from './validarCampos.middleware';

// Validación de auth
export const validarRegistro = [
    body('email')
        .isEmail().with
]