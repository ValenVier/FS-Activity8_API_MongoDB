const InmuebleModel = require('../models/inmueble.model');
const { recordLog } = require('../management/logs.management');
const { updatedObject } = require('../management/updated.management');

const getInmuebles = async (req, res) => {
    try {
        const inmuebles = await InmuebleModel.find();
        res.json(inmuebles);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

const createInmueble = async (req, res) => {
    try {
        const result = await InmuebleModel.create(req.body);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

const updateInmueble = async (req, res) => {
    try {
        const { inmuebleId } = req.params;
        const result = await InmuebleModel.findByIdAndUpdate(inmuebleId, req.body, { new: false }); //new:false -> objeto antes de modificar
        const updatedRecord = updatedObject(result, req.body); //Creo un objeto con los cambios realizados
        recordLog(req.method, updatedRecord); //Creo un log del registro actualizado
        res.json(updatedRecord);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

const deleteInmueble = async (req, res) => {
    try {
        const { inmuebleId } = req.params;
        const inmueble = await InmuebleModel.findByIdAndDelete(inmuebleId);
        recordLog(req.method, inmueble); //Creo un log del registro borrado
        res.json(inmueble);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

//Las funciones recordLog y updatedObject las gestiono en una nueva carptea llamada management

module.exports = { getInmuebles, createInmueble, updateInmueble, deleteInmueble }