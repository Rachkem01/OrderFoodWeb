import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    cartData:{type:Object, default:{}}
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user", userSchema)
//explanation for above if model is already used, use it if not create a new model

export default userModel;