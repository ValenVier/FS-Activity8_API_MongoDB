const express = require('express');
const cors = require('cors');
const dayjs = require('dayjs');
const fs = require('node:fs/promises');

const app = express();

//Config app
app.use(cors());
app.use(express.json());

//Capturamos todas las peticiones realizadas
app.use( async (req, res, next)=>{
    try {
        const linea = `[${dayjs().format('DD/MM/YYYY HH:mm:ss')}] Método:${req.method}, URL:${req.url}\n`;
        await fs.appendFile('./src/logs/main.log', linea); //necesitamos esperar a que escriba la línea antes de ejecutar el resto de la función
        next();
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

//Rutas
app.use('/api', require('./routes/api')); //todas las peticiones que lleguen independientemente del método las envío a esta ruta

//Exporto la app
module.exports = app;