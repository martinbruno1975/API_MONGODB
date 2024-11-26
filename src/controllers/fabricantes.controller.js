const Fabricante = require('../models/fabricante')
const { saveToCache } = require('../middlewares/redis.middleware')

const getAllFabricantes = async (req, res) => {
    const fabricantes = await Fabricante.find()
    saveToCache(fabricantes, 'fabricantes:-1') // Usamos -1 para la lista completa
    res.status(200).json(fabricantes)
}

const getFabricanteById = async (req, res) => {
    const _id = req.params.id
    const fabricante = await Fabricante.findById(_id)
    saveToCache(fabricante, `fabricantes:${_id}`)
    res.status(200).json(fabricante)
}

const createFabricante = async (req, res) => {
    const fabricante = await Fabricante.create(req.body)
    res.status(201).json(fabricante)
}

const deleteFabricanteById = async (req, res) => {
    const _id = req.params.id
    const result = await Fabricante.deleteOne({ _id })
    res.status(200).json({ mensaje: `Filas afectadas: ${result.deletedCount}`})
}

const updateFabricanteById = async (req, res) => {
    const _id = req.params.id
    const fabricante = await Fabricante.findByIdAndUpdate(_id, req.body, { new: true })
    res.status(200).json(fabricante)
}

const getFabricanteYSusProductos = async (req, res) => {
    const _id = req.params.id
    const fabricante = await Fabricante.findById(_id).populate('productos')
    saveToCache(fabricante.productos, `fabricantes:${_id}:productos:-1`)
    res.status(200).json(fabricante.productos)
}

module.exports = { getAllFabricantes, getFabricanteById, createFabricante, deleteFabricanteById, updateFabricanteById, getFabricanteYSusProductos }