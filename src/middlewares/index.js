const genericMiddleware = require('./generic.middleware')
const schemaValidator = require('./schemaValidator')
const redisMiddleware = require('./redis.middleware')

module.exports = { genericMiddleware, schemaValidator, redisMiddleware }