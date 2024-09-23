import orderModel from "../models/orderModel.js";

import userModel from "../models/userModel.js";
import Stripe from 'stripe'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const frondend_url = 'http://localhost:5173'
//place user order from frontEnd
const placeOrder = async (req, res)=>{
try{
const newOrder = new orderModel({
    userId:req.body.userId,
    items:req.body.items,
    amount:req.body.amount,
    address:req.body.address,

})
await newOrder.save()

await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

const line_items = req.body.items.map(()=>({
    price_data:{
        currency:'usa',
        product_data:{
            name:item.name
        },
        unit_amount:item.price*100
    },
    Quantity:item.quantity
}))
line_items.push({
    price_data,
    currency,
    product_data:{
        name:'Delivery Charges'
    },
    unit_amount:2*100*80
})
const session = await stripe.checkout.sessions.create({
    line_items:line_items,
    mode:"payment",
    success_url:`${frondend_url}/verify?sucess=true&orderId=${newOrder._id}`,
    cancel_url:`${frondend_url}/verify?sucess=false&orderId=${newOrder._id}`,
})
res.json({success:true, session_url:session.url})
}catch(error){
console.log(error)
res.json({message:'error'})
}
}
export {placeOrder}