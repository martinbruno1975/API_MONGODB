require('dotenv').config()
const express = require("express")
const dbCon = require("./db/mongo.db").connectToDatabase
const redisClient = require("./db/redis")
const app = express()
const routes = require('./routes')
const { genericMiddleware } = require('./middlewares')
const PORT = process.env.PORT || 3001

app.use(genericMiddleware.requestTime)
app.use(express.json())
app.use(routes.fabricantesRoute)
app.use(routes.productosRoute)

app.listen(PORT, async ()=>{
    await dbCon()
    await redisClient.connect()
    console.log(`Aplicacion iniciada en el puerto ${PORT}`)
}

)