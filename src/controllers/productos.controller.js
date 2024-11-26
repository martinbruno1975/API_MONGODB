const Producto = require("../models/producto")
const Fabricante = require("../models/fabricante")
const { saveToCache } = require('../middlewares/redis.middleware')

const getAllProductos = async (req, res) => {
    const productos = await Producto.find()
    saveToCache(productos, 'productos:-1')  // Usamos -1 para la lista completa
    res.status(200).json(productos)
}

const getProductoById = async (req, res) => {
    const _id = req.params.id;
    const producto = await Producto.find({ _id })
    saveToCache(producto, `productos:${_id}`)
    res.status(200).json(producto)
}

const createProducto = async (req, res) => {
    const producto = await Producto.create(req.body)
    res.status(201).json(producto)
}

const deleteProductoById = async (req, res) => {
    const _id = req.params.id
    const result = await Producto.deleteOne({ _id })
    res.status(200).json({ mensaje: `Filas afectadas: ${result.deletedCount}`})
}

const updateProductoById = async (req, res) => {
    const _id = req.params.id
    const producto = await Producto.findByIdAndUpdate(_id, req.body, { new: true })
    res.status(200).json(producto)
}

const getProductoYSusComponentes = async (req, res) => {
    const _id = req.params.id
    const producto = await Producto.findById(_id)
    saveToCache(producto.componentes, `productos:${_id}:componentes:-1`)
    res.status(200).json(producto.componentes)
}

const addComponenteToProducto = async (req, res) => {
    const _id = req.params.id
    const producto = await Producto.findById(_id)
    producto.componentes.push(req.body)
    await producto.save()
    res.status(200).json(producto)
}

const getComponenteFromProducto = async (req, res) => {
    const _id = req.params.id
    const _idComponente = req.params.componenteId
    const producto = await Producto.findById(_id)
    const componente = producto.componentes.id(_idComponente)
    saveToCache(componente, `productos:${_id}:componentes:${_idComponente}`)
    res.status(200).json(componente)
}

const updateComponenteFromProducto = async (req, res) => {
    const _id = req.params.id
    const _idComponente = req.params.componenteId
    const producto = await Producto.findById(_id)
    const componente = producto.componentes.id(_idComponente)
    componente.set(req.body)
    await producto.save()
    res.status(200).json(producto)
}

const deleteComponenteFromProducto = async (req, res) => { 
    const _id = req.params.id
    const _idComponente = req.params.componenteId
    const producto = await Producto.findByIdAndUpdate(
        _id,
        { $pull: { componentes: { _id: _idComponente } } },
        { new: true }
    )
    res.status(200).json(producto)
}

const getProductoYSusFabricantes = async (req, res) => {
    const _id = req.params.id
    const producto = await Producto.findById(_id).populate('fabricantes')
    saveToCache(producto.fabricantes, `productos:${_id}:fabricantes:-1`)
    res.status(200).json(producto.fabricantes)
}

const addFabricanteToProducto = async (req, res) => {
    const _id = req.params.id
    const fabricanteBody = req.body
    const producto = await Producto.findById(_id)

    let fabricante = await Fabricante.findOne({ nombre: fabricanteBody.nombre });

    if (!fabricante) {
        fabricante = await Fabricante.create(fabricanteBody)
    }

    if (!producto.fabricantes.includes(fabricante._id)) {
        producto.fabricantes.push(fabricante._id)
        await producto.save()
    }

    if (!fabricante.productos.includes(producto._id)) {
        fabricante.productos.push(producto._id)
        await fabricante.save()
    }

    res.status(200).json(producto)
}

module.exports = { getAllProductos, getProductoById, createProducto, deleteProductoById, updateProductoById, getProductoYSusComponentes, addComponenteToProducto, getComponenteFromProducto, updateComponenteFromProducto, deleteComponenteFromProducto, getProductoYSusFabricantes, addFabricanteToProducto }