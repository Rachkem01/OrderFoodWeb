import mongoose, { Mongoose } from "mongoose";

const ordersSchema =new mongoose.Schema({
    userId:{type:String, required:true},
    item:{type:Array, required:true},
    amount:{type:Number, required:true},
    address:{type:Object, required:true},
    status:{type:String, default:'Food processing'},
    date:{type:Date, default:Date.now()},
    payment:{type:Boolean, default:false}
})

const orderModel = mongoose.models.order || mongoose.model('oder',ordersSchema)

export default orderModel;