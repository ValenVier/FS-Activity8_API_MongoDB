const router = require('express').Router();
const InmueblesController = require('../../controllers/inmuebles.controller'); //Requiero el controlador de los inmuebles
const { checkInmueble, duplicateInmueble, checkFormat, noDuplicateInmueble } = require('../../middlewares/inmuebles.middleware');

//Rutas con los verbos CRUD
router.get('/', InmueblesController.getInmuebles);
router.post('/', checkFormat, duplicateInmueble, InmueblesController.createInmueble);
router.put('/:inmuebleId', checkFormat, checkInmueble, noDuplicateInmueble, InmueblesController.updateInmueble);
router.delete('/:inmuebleId', checkInmueble, InmueblesController.deleteInmueble);


module.exports = router;