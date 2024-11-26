const mongoose = require("../db/mongo.db").mongoose
const { Schema } = require("mongoose")

const productoSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: [true, 'El campo nombre es obligatorio.'],
        minlength: [3, 'El campo nombre debe tener al menos 3 caracteres.'],
        maxlength: [255, 'El campo nombre no puede exceder los 255 caracteres.']
    },
    descripcion: {
        type: Schema.Types.String,
        required: [true, 'El campo descripcion es obligatorio.'],
        minlength: [3, 'El campo descripcion debe tener al menos 3 caracteres.'],
        maxlength: [255, 'El campo descripcion no puede exceder los 255 caracteres.']
    },
    precio: {
        type: Schema.Types.Decimal128,
        required: [true, 'El campo precio es obligatorio.'],
        min: [0, 'El campo precio debe ser positivo.']
    },
    pathImg: {
        type: Schema.Types.String,
        required: [true, 'El campo pathImg es obligatorio.'],
        minlength: [3, 'El path de la imagen debe tener al menos 3 caracteres.'],
        maxlength: [255, 'El path de la imagen no puede exceder los 255 caracteres.']
    },
    componentes: [{
        nombre: {
            type: Schema.Types.String,
            required: [true, 'El campo nombre del componente es obligatorio.'],
            minlength: [3, 'El campo nombre del componente debe tener al menos 3 caracteres.'],
            maxlength: [255, 'El campo nombre del componente no puede exceder los 255 caracteres.']
        },
        descripcion: {
            type: Schema.Types.String,
            required: [true, 'El campo descripcion del componente es obligatorio.'],
            minlength: [3, 'El campo descripcion del componente debe tener al menos 3 caracteres.'],
            maxlength: [255, 'El campo descripcion del componente no puede exceder los 255 caracteres.']
        }
    }],
    fabricantes: [{
        type: Schema.Types.ObjectId,
        ref: 'Fabricante',
    }]
})

productoSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.__v
    }
})

module.exports = mongoose.model("Producto", productoSchema)
