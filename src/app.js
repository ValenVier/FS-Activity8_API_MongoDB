const express = require('express');
const cors = require('cors');

const app = express();

//Config app
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api', require('./routes/api')); //todas las peticiones que lleguen independientemente del método las envío a esta ruta

//Exporto la app
module.exports = app;