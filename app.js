import express from 'express'
import dotenv from 'dotenv'
import connectDB from './DB/connection.js'
import * as indexRouter from './src/index.router.js'
dotenv.config({path:'./config/.env'})
const app = express()
app.use(express.json())
connectDB()
const port = process.env.PORT
const baseURL = process.env.BASEURL
app.use((`${baseURL}user`),indexRouter.userRouter)
app.use((`${baseURL}auth`),indexRouter.authRouter)
app.use('*',(req,res)=>{
    res.status(404).json({message:"page not found..."})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))