import mongoose from "mongoose";

 export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://root:test@cluster0.fokb1.mongodb.net/FOOD')
    .then(()=>console.log('DB Conncected'))
    .catch((error)=>console.log(error.message))
}

// ?retryWrites=true&w=majority&appName=Cluster0