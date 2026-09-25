// middlewares\rateLimit.middleware.js
import rateLimit from 'express-rate-limit';

export const limitadorGlobal = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        mensaje: 'Has superado el limite de peticiones. Intenta nuevamente en 15 minutos.'
    }
})

export const limitadorLogin = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: {
        mensaje: "Demasiados intentos fallidos de inicio de sesion. intente nuevamente en 1 hora"
    }
});