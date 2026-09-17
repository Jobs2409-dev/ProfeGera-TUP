import { Router } from 'express';

import {
    registrasUsuario
} from '../controllers/auth.controller.js'

const router = Router();

router.post('/', registrasUsuario);

export default router;