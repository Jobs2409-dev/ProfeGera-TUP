// routes/auth.routes.js
import { Router } from 'express';
import { check } from 'express-validator';
import {
    login,
    registrasUsuario
} from '../controllers/auth.controller.js';

import { validarCampos } from '../middlewares/validarCampos.middleware.js';
import { limitadorLogin } from '../middlewares/rateLimit.middleware.js';

const router = Router();

router.post('/', 
    check('email', 'El correo debe ser un email válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 4 caracteres').isLength({ min: 4 }),
    check('rol', 'El rol debe ser ADMIN o VENDEDOR').optional().isIn(['ADMIN', 'VENDEDOR']),
    validarCampos,
    registrasUsuario
);


router.post('/login', 
    limitadorLogin, 
    check('email', 'Credenciales incompletas o formato inválido').isEmail(),
    check('password', 'Credenciales incompletas o formato inválido').notEmpty(),
    validarCampos,
    login
);

export default router;