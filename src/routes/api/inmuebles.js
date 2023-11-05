const router = require('express').Router();
const InmueblesController = require('../../controllers/inmuebles.controller'); //Requiero el controlador de los inmuebles

//Rutas con los verbos CRUD
router.get('/', InmueblesController.getInmuebles);
router.post('/', InmueblesController.createInmueble);
router.put('/:inmuebleId', InmueblesController.updateInmueble);
router.delete('/:inmuebleId', InmueblesController.deleteInmueble);


module.exports = router;