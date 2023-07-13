import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './DB/connection.js'
import * as indexRouter from './src/index.router.js'

dotenv.config({path:'./config/.env'})
const app = express()
app.use(express.json())
if(process.env.MOOD=='DEV'){
  app.use(morgan("dev"))
}

connectDB()
const port = process.env.PORT
const baseURL = process.env.BASEURL
app.use((`${baseURL}user`),indexRouter.userRouter)
app.use((`${baseURL}auth`),indexRouter.authRouter)
app.use((`${baseURL}category`),indexRouter.categoryRouter)
app.use((`${baseURL}subcategory`),indexRouter.subCategoryRouter)
app.use((`${baseURL}brand`),indexRouter.brandRouter)
app.use((`${baseURL}product`),indexRouter.productRouter)
app.use((`${baseURL}coupon`),indexRouter.couponRouter)
app.use((err,req,res,next)=>{
      if(err){
        return res.status(err['cause']).json({message:err.message})
      }
})
app.use('*',(req,res)=>{
    res.status().json({message:"page not found..."})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))