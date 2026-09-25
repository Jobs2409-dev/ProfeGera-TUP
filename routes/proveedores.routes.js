import { Router } from 'express';
import { check } from 'express-validator';
import {
    crearProveedor,
    obtenerProveedores,
    actualizarCalificacion
} from '../controllers/proveedor.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { verificarAdmin } from '../middlewares/rol.middleware.js';
import { validarCampos } from '../middlewares/validarCampos.middleware.js';

const router = Router();

router.post('/',
    verificarToken, 
    verificarAdmin, 
    check('razonsocial', 'La razón social es obligatorio').notEmpty().trim(),
    check('cuil', 'El CUIL debe contener exactamente 11 dígitos numéricos').matches(/^\d{11}$/),
    check('contacto.email', 'El correo de contacto debe ser un email válido').isEmail(),
    check('contacto.telefono', 'El teléfono debe ser una cadena de texto').optional().isString(),
    check('categorias', 'Las categorías deben enviarse en formato de lista').optional().isArray(),
    validarCampos,
    crearProveedor
);


router.get('/', verificarToken, obtenerProveedores);

router.patch('/:id/calificacion',
    verificarToken,
    verificarAdmin,
    check('id', 'El ID proporcionado en la ruta no es un identificador válido de Mongo').isMongoId(),
    check('calificacion', 'La calificación es requerida y debe ser un valor numérico').notEmpty().isNumeric(),
    validarCampos,
    actualizarCalificacion
);

export default router;