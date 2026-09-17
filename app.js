import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { conectarDB } from './config/db.js';
import 'dotenv/config';
import productoRoutes from './routes/productos.routes.js';
import exampleRoutes from './routes/example.routes.js';
import proveedoresRoutes from './routes/proveedores.routes.js';
// Clase del  día 17/09
import authRoutes from './routes/auth.routes.js';

const app = express();

//Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/ejemplos', exampleRoutes)
app.use('/api/productos', productoRoutes)
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/auth', authRoutes); // (clase del día 17/09)

conectarDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor Express listo en http://localhost:${PORT}`);
    });
});