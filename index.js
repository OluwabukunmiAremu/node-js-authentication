import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose" 
import cors from "cors"
dotenv.config()
import { UserRouter } from "./routes/user.js"
import connectToDatabase from "./Mongodb.js"
const app = express()
app.use(express.json()) 
app.use(cors())
app.use('/auth', UserRouter)
const options = {
    useNewUrlParser: true,
    socketTimeoutMS: 0,
    connectTimeoutMS: 2000000000,
    useUnifiedTopology: true,
   
  }
await mongoose.connect('mongodb://127.0.0.1:27017/authentication', options) 
let db 
db = mongoose.connection 
  db.on('error', (err) => {           
    console.log(`There was a db connection error!! ${err.message}`, err)
  })
  db.once('connected', () => {
    console.log('DB connection created successfully!')
  })
  db.once('disconnected', () => {
    console.log('DB connection disconnected!!')
  })


app.listen(process.env.PORT, async ()=> {
    console.log("Server is running")
    await connectToDatabase()
}) 

