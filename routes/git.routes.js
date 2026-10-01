// routes/git.routes.js
import { Router } from 'express';
import { obtenerResumenGit } from '../controllers/git.controller.js';

const router = Router();

router.get('/users/:nombreUsuario', obtenerResumenGit);

export default router;