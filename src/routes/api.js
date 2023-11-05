const router = require('express').Router();

//Rutas
router.use('/inmuebles', require('./api/inmuebles')); //todas las peticiones que entren con esta ruta se gestionara en inmuebles.js

module.exports = router;