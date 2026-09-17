import { Router } from 'express';
import {
    crearProveedor,
    obtenerProveedores,
    actualizarCalificacion
} from '../controllers/proveedor.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { verificarAdmin } from '../middlewares/rol.middleware.js';

const router = Router();

router.post('/', verificarToken, verificarAdmin, crearProveedor);
router.get('/', verificarToken, obtenerProveedores);
router.patch('/:id/calificacion', verificarToken, verificarAdmin, actualizarCalificacion);

export default router;