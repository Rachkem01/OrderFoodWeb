 import express from 'express'
 import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

 //app config
 const app = express()

 const port = process.env.PORT || 4000

 //add middleware
 app.use(express.json())
 app.use(cors())
 //db connection
 connectDB()

//api endpoints
app.use("/api/food", foodRouter)
//acess added image from database
app.use("/images", express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)


  app.get('/', (request,response)=>{
    response.send('API working')
  })

  app.listen(4000, ()=>{
console.log(`Server is running on http://localhost:${port}`)
  })
