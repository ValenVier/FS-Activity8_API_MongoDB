const express = require('express');
const cors = require('cors');

const app = express();

//Config app
app.use(cors());
app.use(express.json());

//Rutas


//Exporto la app
module.exports = app;