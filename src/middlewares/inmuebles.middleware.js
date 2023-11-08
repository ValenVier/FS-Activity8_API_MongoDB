const InmuebleModel = require('../models/inmueble.model');

//comprueba que el inmueble esté en el servidor y se pueda coger por el id
const checkInmueble = async (req, res, next) => {
    try {
        const { inmuebleId } = req.params;
        const inmueble = await InmuebleModel.findById(inmuebleId)
        if (!inmueble) {
            return res.json({ fatal: "El producto no existe" });
        }
        next();
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

//comprueba que al crear un inmueble no esté ya en el servidor
const duplicateInmueble = async (req, res, next) => {
    try {
        const inmueble = await InmuebleModel.getInmuebleByValues(req.body.floor, req.body.letter);
        if (inmueble.length > 0) {
            return res.json({ fatal: "El inmueble ya existe." });
        }
        next();
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

//comprueba que al actualizar un inmueble no se creen duplicados
const noDuplicateInmueble = async (req, res, next) => {
    try {
        const { inmuebleId } = req.params;
        const inmueble = await InmuebleModel.findById(inmuebleId);
        let duplicate = [];
        if (req.body.floor !== undefined || req.body.letter !== undefined) {
            duplicate = await InmuebleModel.getInmuebleByValues(
                req.body.floor !== undefined ? req.body.floor : inmueble.floor,
                req.body.letter !== undefined ? req.body.letter : inmueble.letter
            );
        }
        if (duplicate.length > 0) {
            return res.json({ fatal: "El piso y/o letra que intenta actualizar ya está en la base de datos." });
        }
        next();
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

//Comprueba que los datos en los campos sean los correctos
const checkFormat = async (req, res, next) => {
    try {
        const inmueble = req.body;
        let cont = 0;
        var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        let messageBug = `Debe solucionar los siguientes errores antes de poder guardar el inmueble`;

        inmueble.floor === undefined ? cont++ : !isNaN(inmueble.floor) ? cont++ : messageBug += ", Piso no es un número";
        inmueble.letter === undefined ? cont++ : typeof inmueble.letter === "string" ? cont++ : messageBug += ", Letra no es válido";
        inmueble.extension === undefined ? cont++ : !isNaN(inmueble.extension) ? cont++ : messageBug += ", Extensión no es un número";
        inmueble.rooms === undefined ? cont++ : !isNaN(inmueble.rooms) ? cont++ : messageBug += ", Número de habitaciones no es un número";
        inmueble.rented === undefined ? cont++ : typeof inmueble.rented === "boolean" ? cont++ : messageBug += ", Alquilado no es un booleano";
        inmueble.landlord === undefined ? cont++ : typeof inmueble.landlord === "string" ? cont++ : messageBug += ", Propietario no es una cadena de texto";
        inmueble.email === undefined ? cont++ : validEmail.test(inmueble.email) ? cont++ : messageBug += ", Email no es valido";

        cont === 7 ? next() : res.json({ fatal: messageBug });

    } catch (error) {
        res.json({ fatal: error.message });
    }
}

module.exports = { checkInmueble, duplicateInmueble, checkFormat, noDuplicateInmueble }