import { Router } from 'express';
import { check } from 'express-validator';
import {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    borrarProducto
} from '../controllers/producto.controller.js';

import { verificarToken } from '../middlewares/auth.middleware.js'
import { verificarAdmin } from '../middlewares/rol.middleware.js'
import { validarCampos } from '../middlewares/validarCampos.middleware.js';

const router = Router();

// Consultas públicas
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);

// Post: Crear producto
router.post('/', 
    verificarToken,
    verificarAdmin,
    check('codigoSKU', 'El SKU es obligatorio y debe tener formato ABC-123').matches(/^[A-Z]{3}-\d{3}$/),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('precio', 'El precio debe ser un número mayor o igual a 0').isFloat({ min: 0 }),
    check('stock', 'El stock debe ser un entero mayor o igual a 0').optional().isInt({ min: 0 }),
    check('categoria', 'Categoría no permitida').isIn(['PERIFERICO', 'MONITORES', 'COMPONENTES', 'ACCESORIOS']),
    check('proveedor', 'El ID del proveedor debe ser un MongoId válido').isMongoId(),
    validarCampos,
    crearProducto
);

// Put: Actualizar Producto
router.put('/:id', 
    verificarAdmin,
    verificarToken,
    check('id', 'El ID del producto debe ser un MongoId válido').isMongoId(),
    check('codigoSKU', 'El SKU debe tener formato ABC-123').optional().matches(/^[A-Z]{3}-\d{3}$/),
    check('nombre', 'El nombre no puede estar vacío').optional().notEmpty(),
    check('precio', 'El precio debe ser un número mayor o igual a 0').optional().isFloat({ min: 0 }),
    check('stock', 'El stock debe ser un entero mayor o igual a 0').optional().isInt({ min: 0}),
    check('categoria', 'Categoría no permitida').optional().isIn(['PERIFERICOS', 'MONITORES', 'COMPONENTES', 'ACCESORIOS']),
    check('proveedor', 'El ID del proveedor debe ser un MongoId válido').optional().isMongoId(),
    validarCampos,
    actualizarProducto
);

// Delete
router.delete('/:id', verificarAdmin, verificarToken, borrarProducto);

export default router;