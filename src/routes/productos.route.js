const { Router } = require('express')
const productosController = require('../controllers/productos.controller')
const middlewares = require('../middlewares')
const schemas = require('../schemas')
const Producto = require('../models/producto')
const Fabricante = require('../models/fabricante')
const route = Router()

route.get('/productos', 
    middlewares.redisMiddleware.checkCache('productos'),
    productosController.getAllProductos
)

route.get('/productos/:id', 
    middlewares.redisMiddleware.checkCache('productos'),
    middlewares.genericMiddleware.validateId(Producto), 
    productosController.getProductoById
)

route.post('/productos', 
    middlewares.schemaValidator(schemas.productosSchema),
    middlewares.redisMiddleware.deleteCache('productos'),
    productosController.createProducto
)

route.delete('/productos/:id', 
    middlewares.genericMiddleware.validateId(Producto),
    middlewares.genericMiddleware.validateAssociationsById(Producto, Fabricante),
    middlewares.redisMiddleware.deleteCache('productos'),
    productosController.deleteProductoById
)

route.put('/productos/:id', 
    middlewares.schemaValidator(schemas.productosSchema),
    middlewares.genericMiddleware.validateId(Producto),
    middlewares.redisMiddleware.deleteCache('productos'),
    productosController.updateProductoById
)

// Rutas de componentes
route.get('/productos/:id/componentes', 
    middlewares.redisMiddleware.checkCache('productos:componentes'),
    middlewares.genericMiddleware.validateId(Producto),
    productosController.getProductoYSusComponentes
)

route.post('/productos/:id/componentes', 
    middlewares.genericMiddleware.validateId(Producto),
    middlewares.schemaValidator(schemas.componentesSchema),
    middlewares.redisMiddleware.deleteCache('productos:componentes'),
    productosController.addComponenteToProducto
)

route.get('/productos/:id/componentes/:componenteId',
    middlewares.redisMiddleware.checkCache('productos:componentes'),
    middlewares.genericMiddleware.validateId(Producto),
    middlewares.genericMiddleware.validateComponentId(Producto),
    productosController.getComponenteFromProducto
)

route.put('/productos/:id/componentes/:componenteId',
    middlewares.genericMiddleware.validateId(Producto),
    middlewares.genericMiddleware.validateComponentId(Producto),
    middlewares.schemaValidator(schemas.componentesSchema),
    middlewares.redisMiddleware.deleteCache('productos:componentes'),
    productosController.updateComponenteFromProducto
)

route.delete('/productos/:id/componentes/:componenteId',
    middlewares.genericMiddleware.validateId(Producto),
    middlewares.genericMiddleware.validateComponentId(Producto),
    middlewares.redisMiddleware.deleteCache('productos:componentes'),
    productosController.deleteComponenteFromProducto
)

// Rutas de fabricantes
route.get('/productos/:id/fabricantes',
    middlewares.redisMiddleware.checkCache('productos:fabricantes'),
    middlewares.genericMiddleware.validateId(Producto),
    productosController.getProductoYSusFabricantes
)

route.post('/productos/:id/fabricantes',
    middlewares.genericMiddleware.validateId(Producto),
    middlewares.schemaValidator(schemas.fabricantesSchema),
    middlewares.redisMiddleware.deleteCache('productos:fabricantes'),
    productosController.addFabricanteToProducto
)

module.exports = route
