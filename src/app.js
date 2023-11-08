const express = require('express');
const cors = require('cors');
const dayjs = require('dayjs');
const fs = require('node:fs/promises');
const { mainLog } = require('./management/logs.management');

const app = express();

//Config app
app.use(cors());
app.use(express.json());

//Capturamos todas las peticiones realizadas
app.use((req, res, next)=>{
    mainLog(req);
    next();
});

//Rutas
app.use('/api', require('./routes/api')); //todas las peticiones que lleguen independientemente del método las envío a esta ruta

//Exporto la app
module.exports = app;