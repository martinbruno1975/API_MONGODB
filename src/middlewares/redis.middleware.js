const redisClient = require('../db/redis')

const checkCache = (collection) => (req, res, next) => {
    const id = req.params.id ?? -1 // Usamos -1 para la lista completa
    const key = `${collection}:${id}`
    
    redisClient.get(key).then(data => {
        if (data) {
            return res.status(200).json(JSON.parse(data))
        }
        next()
    }).catch(() => next())
}

const deleteCache = (collection) => (req, res, next) => {
    const id = req.params.id ?? -1

    if (id !== -1) {
        redisClient.keys(`${collection}:${id}:*`).then(keys => {
            if (keys.length > 0) {
                redisClient.del(keys)
            }
        })
        
        redisClient.del(`${collection}:${id}`)
    }
    
    const listKey = `${collection}:-1`
    redisClient.del(listKey)
    
    next()
}

const saveToCache = (data, key) => {
    redisClient.setEx(key, 3600, JSON.stringify(data))
}

module.exports = { checkCache, deleteCache, saveToCache }