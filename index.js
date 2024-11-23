const express = require('express')
require('dotenv').config()
const connectMongodb = require('./connection')
const userRouter = require('./routes/user')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.port;
connectMongodb(process.env.mongourl)
.then(()=>console.log("mongo is connected"))

app.use('/',userRouter)


app.listen(port,()=>{
    console.log("port is running")
})