// app.js

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { conectarDB } from './config/db.js';
import 'dotenv/config';
import productoRoutes from './routes/productos.routes.js';
import exampleRoutes from './routes/example.routes.js';
import proveedoresRoutes from './routes/proveedores.routes.js';
import { limitadorGlobal } from './middlewares/rateLimit.middleware.js';

// Clase del día 17/09
import authRoutes from './routes/auth.routes.js';

// Clase del día 01/10
import externoRoutes from './routes/externo.routes.js';
import gitRoutes from './routes/git.routes.js';
import iaRoutes from './routes/ia.routes.js';

// Clase del día 14/10 y 15/10 (SOCKET.IO Y HTTP)
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

// Middlewares globales
app.use(helmet());

const origenesPermitidos = ['http://localhost:3000', 'https://mi-pagina.com'];

// Crear el servidor HTTP envolviendo la app de Express
const httpServer = createServer(app);

// Inicializar Socket.IO sobre el servidor HTTP
const io = new Server(httpServer, {
    cors: { origin: "*" }
});

io.on( 'connection', (socket) => {
    console.log(`🟢 Nuevo cliente conectado al WebSocket, ID: ${socket.id}`);

    socket.on('aviso_frontend', (data) => {
        console.log('mensaje del frontend:', data);

        io.emit('notificacion_global', {
            mensaje: "Alguien hizo click"
        });
    });

    

    socket.on('disconnect', () => {
        console.log(`🔴 Cliente desconectado. ID: ${socket.id}`)
    });
});

app.use(cors({
    origin: function(origen, callback) {
        if (!origen || origenesPermitidos.includes(origen)) {
            callback(null, true);
        } else {
            callback(new Error('Bloqueado por políticas CORS'));
        }
    }
}));

app.use(morgan('dev'));
app.use(limitadorGlobal);
app.use(express.json());

// Rutas
app.use('/api/externo/clima', externoRoutes);
app.use('/api/git', gitRoutes); 
app.use('/api/ia', iaRoutes); 
app.use('/api/ejemplos', exampleRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

// Levantar el servidor usando httpServer en lugar de app.listen
conectarDB().then(() => {
    httpServer.listen(PORT, () => {
        console.log(`Servidor Express y WebSockets listos en http://localhost:${PORT}`);
    });
});