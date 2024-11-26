const mongoose = require("../db/mongo.db").mongoose
const { Schema } = require("mongoose")

const fabricanteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "nombre es requerido"],
        minlength: [3, "nombre debe tener como minimo 3 caracteres"],
        maxlength: [255, "nombre debe tener como maximo 255 caracteres"]
    },
    direccion: {
        type: String,
        required: [true, "direccion es requerido"],
        minlength: [3, "direccion debe tener como minimo 3 caracteres"],
        maxlength: [255, "direccion debe tener como maximo 255 caracteres"]
    },
    numeroContacto: {
        type: String,
        required: [true, "numeroContacto es requerido"],
        minlength: [8, "numeroContacto debe tener como minimo 8 caracteres"],
        maxlength: [11, "numeroContacto debe tener como maximo 11 caracteres"]
    },
    pathImgPerfil: {
        type: String,
        required: [true, "pathImgPerfil es requerido"],
        minlength: [10, "pathImgPerfil debe tener como minimo 10 caracteres"],
        maxlength: [255, "pathImgPerfil debe tener como maximo 255 caracteres"]
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: "Producto"
    }]
})

fabricanteSchema.set("toJSON", {
    transform: (_, ret) => {
        delete ret.__v
    }
})

module.exports = mongoose.model("Fabricante", fabricanteSchema)