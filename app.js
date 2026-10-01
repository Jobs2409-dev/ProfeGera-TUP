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
// Clase del  día 17/09
import authRoutes from './routes/auth.routes.js';
// Clase del día 01/10
import externoRoutes from './routes/externo.routes.js';
import gitRoutes from './routes/git.routes.js';
import iaRoutes from './routes/ia.routes.js';

const app = express();

//Middlewares globales
// Oculta los headers
app.use(helmet())

const origenesPermitidos = ['http://localhost:3000', 'https://mi-pagina.com']


app.use(cors({
    origin: function(origen, callback){
        if (!origen || origenesPermitidos.includes(origen)) {
            callback(null, true);
        } else {
            callback(new Error('Bloqueado por póliticas CORS'))
        }
    }
}));

app.use(morgan('dev'));
app.use(limitadorGlobal)
app.use(express.json());
app.use('/api/externo/clima', externoRoutes);

// Clase del día 01/10
app.use('/api/git', gitRoutes); 
app.use('/api/ia', iaRoutes); 


const PORT = process.env.PORT || 3000;

app.use('/api/ejemplos', exampleRoutes)
app.use('/api/productos', productoRoutes)
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/auth', authRoutes); // Clase del día 17/09

conectarDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor Express listo en http://localhost:${PORT}`);
    });
});
