// routes/auth.routes.js
import { Router } from 'express';

import {
    login,
    registrasUsuario
} from '../controllers/auth.controller.js'

const router = Router();

router.post('/', registrasUsuario);
router.post('/login', login);

export default router;