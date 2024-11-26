const mongoose = require('mongoose')

const requestTime = (req, _ , next) => {
    console.log({ url: req.url, method: req.method , fechaHora: new Date() })
    next()
}

const validateId = (Model) => {
  return async (req, res, next) => {
    const _id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).send('ID no válido')
    }

    const model = await Model.findById(_id)

    if (!model) {
      return res.status(404).send(`${Model.modelName} no encontrado`)
    }

    next();
  }
}

const validateComponentId = (Model) => {
  return async (req, res, next) => {
    const { id, componenteId } = req.params
    console.log({ id, componenteId })
    if (!mongoose.Types.ObjectId.isValid(componenteId)) {
      return res.status(400).send('ID no válido')
    }

    const producto = await Model.findById(id)
    const componente = producto.componentes.id(componenteId)

    if (!componente) {
      return res.status(404).send('Componente no encontrado')
    }

    next()
  }
}

const validateAssociationsById = (Model, throughModel) => {
  return async (req, res, next) => {
    const id = req.params.id;

    const instance = await Model.findById(id).populate(throughModel.modelName.toLowerCase() + 's')

    const associations = instance[throughModel.modelName.toLowerCase() + 's']
    if (associations.length > 0) {
      return res.status(500).json({ mensaje: `No se puede eliminar el ${Model.modelName} porque tiene registros asociados en ${throughModel.modelName}.` })
    }

    next()
  }
}

module.exports = { requestTime, validateId, validateComponentId, validateAssociationsById}