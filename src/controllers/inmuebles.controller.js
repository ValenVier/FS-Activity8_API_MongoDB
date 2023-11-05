const InmuebleModel = require('../models/inmueble.model');

const getInmuebles = async (req, res) => {
    try {
        const inmuebles = await InmuebleModel.find();
        console.log('USER', req.user)
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
        const result = await InmuebleModel.findByIdAndUpdate(inmuebleId, req.body, { new: true }); //new:true -> objeto modificado
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

const deleteInmueble = async (req, res) => {
    try {
        const { inmuebleId } = req.params;
        const inmuebles = await InmuebleModel.findByIdAndDelete(inmuebleId);
        res.json(inmuebles);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};


module.exports = { getInmuebles, createInmueble, updateInmueble, deleteInmueble }