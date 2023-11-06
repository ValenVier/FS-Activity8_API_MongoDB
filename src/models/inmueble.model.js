const { Schema, model } = require('mongoose');

const inmuebleSchema = new Schema({
    floor: Number,
    letter: String,
    extension: Number,
    rooms: Number,
    rented: Boolean,
    landlord: String,
    email: String 
}, {
    versionKey: false,
    timestamps: true, //createdAt, updatedAt
    toObject: {
        virtuals: true,
        transform: function (doc, ret) {
            // para transformar el objeto que se devuelve
            ret.id = ret._id;
            delete ret._id;
            ret.Piso = ret.floor;
            delete ret.floor;
            ret.Letra = ret.letter;
            delete ret.letter;
            delete ret.extension;
            delete ret.rooms;
            delete ret.rented;
            delete ret.landlord;
            ret.Email = ret.email;
            delete ret.email;
        }
    },
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            // para transformar el json que se devuelve
            ret.id = ret._id;
            delete ret._id;
            ret.Piso = ret.floor;
            delete ret.floor;
            ret.Letra = ret.letter;
            delete ret.letter;
            delete ret.extension;
            delete ret.rooms;
            delete ret.rented;
            delete ret.landlord;
            ret.Email = ret.email;
            delete ret.email;
        }
    }
});

inmuebleSchema.virtual('Extensión (m2)').get(function () {
    return `${this.extension} (m2)`;
});
inmuebleSchema.virtual('Número de habitaciones').get(function () {
    return `${this.rooms}`;
});
inmuebleSchema.virtual('Alquilado').get(function () {
    return this.rented ? 'Sí' : "No";
});
inmuebleSchema.virtual('Nombre Propietraio').get(function () {
    return `${this.landlord}`;
});

inmuebleSchema.statics.getInmuebleByValues = function (floor, letter) {
    return model('inmueble').find({
        floor: floor,
        letter: letter
    });
};


module.exports = model('inmueble', inmuebleSchema); //Relación entre la colección y el schema