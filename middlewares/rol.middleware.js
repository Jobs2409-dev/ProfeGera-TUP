// middlewares/rol.middleware.js
export const verificarAdmin = ( req, res, next ) => {
    if(!req.usuario){
        return res.status(401).json({ mensaje: 'Se intento verificar el rol, pero no se consiguio'});
    }

    if(req.usuario.rol !== 'ADMIN') {
        return res.status(403).json({ mensaje: 'Acceso denegado. Se requiere privilegios de Administrador.'});
    }

    next();

} 