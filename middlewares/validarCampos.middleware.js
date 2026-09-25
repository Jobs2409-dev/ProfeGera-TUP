// middlewares\validarCampos.middleware.js
import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            mensaje: "Errores de validación en los datos enviados.",
            detalles: errores.array()
        });
    }

    next();
}