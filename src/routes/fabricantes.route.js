const { Router } = require('express')
const fabricantesController = require('../controllers/fabricantes.controller')
const middlewares = require('../middlewares')
const schemas = require('../schemas')
const Fabricante = require('../models/fabricante')
const Producto = require('../models/producto')
const route = Router()

route.get('/fabricantes', 
    middlewares.redisMiddleware.checkCache('fabricantes'),
    fabricantesController.getAllFabricantes
)

route.get('/fabricantes/:id', 
    middlewares.redisMiddleware.checkCache('fabricantes'),
    middlewares.genericMiddleware.validateId(Fabricante), 
    fabricantesController.getFabricanteById
)

route.post('/fabricantes', 
    middlewares.schemaValidator(schemas.fabricantesSchema),
    middlewares.redisMiddleware.deleteCache('fabricantes'),
    fabricantesController.createFabricante
)

route.delete('/fabricantes/:id', 
    middlewares.genericMiddleware.validateId(Fabricante),
    middlewares.genericMiddleware.validateAssociationsById(Fabricante, Producto),
    middlewares.redisMiddleware.deleteCache('fabricantes'),
    fabricantesController.deleteFabricanteById
)

route.put('/fabricantes/:id', 
    middlewares.schemaValidator(schemas.fabricantesSchema),
    middlewares.genericMiddleware.validateId(Fabricante),
    middlewares.redisMiddleware.deleteCache('fabricantes'),
    fabricantesController.updateFabricanteById
)

route.get('/fabricantes/:id/productos', 
    middlewares.redisMiddleware.checkCache('fabricantes:productos'),
    middlewares.genericMiddleware.validateId(Fabricante),
    fabricantesController.getFabricanteYSusProductos
)

module.exports = route