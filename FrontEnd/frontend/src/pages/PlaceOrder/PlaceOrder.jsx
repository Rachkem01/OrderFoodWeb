import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/Context'
import axios from 'axios'
const PlaceOrder = () => {
  const {getTotalCart, token, food_list, cartItems, url} = useContext(StoreContext)
  const [data, setData] = useState({
    firstName :'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandeler =(event)=>{
const name= event.target.name
const value= event.target.value
setData(data=>({...data,[name]:value}))
  }

useEffect(()=>{
console.log(data)
},[data])
const placeorder = async(event)=>{
event.preventDefault()
let orderItems =[]
food_list.map((item)=>{
  if(cartItems[item._id]){
    let iteminfo = item
    iteminfo["quantity"]=cartItems[item._id]
    orderItems.push(iteminfo)
  }
})
let orderData = {
  address:data,
  items:orderItems,
  amount:getTotalCart()+2
}
let response = await axios.post(url+'/api/order/place', orderData,{headers:{token}})
if(response.data.success){
  const {session_url} = response.data;
  //to send user order to session url
  window.location.replace(session_url)
}
else{
  alert("Error")
}
}
  return (
    <form className='placeorder' onSubmit={placeorder}>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
      <input required name='firstName' onChange={onChangeHandeler} value={data.firstName} type="text"  placeholder='First name'/>
      <input required  name='lastName' onChange={onChangeHandeler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
      
      
      <input required name='email' onChange={onChangeHandeler} value={data.email} type="email"  placeholder='Email Address'/>
      <input required type="text" placeholder='Street' />
      <div className="multi-fields">
      <input required name='city' onChange={onChangeHandeler} value={data.city} type="text"  placeholder='City'/>
      <input required  name='state' onChange={onChangeHandeler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
      <input required  name='zipcode' onChange={onChangeHandeler} value={data.zipcode} type="text"  placeholder='Zip code'/>
      <input required  name='country' onChange={onChangeHandeler} value={data.country}type="text" placeholder='Country' />
        </div>
      <input required                             name='phone' onChange={onChangeHandeler} value={data.phone} type='text' placeholder='phone'/>
</div>
        <div className='place-order-right'>
        <div className="cart-total">
    <h2>Cart Total</h2>
    <div className='cart-total-detals'></div>
    <p>SubTotal</p>
    <p>{getTotalCart()}</p>
    <hr/>
    <div className='cart-total-detals'>
      <p>Delivery Fee</p>
      <p>{getTotalCart()}</p>
    </div><hr/>
    <div className='cart-total-detals'>
      <b>Total</b>
      <b></b>
    </div>
    <button type='submit' onClick={()=>navigate('/placeorder')}>Proceed to Payment</button>
    </div>
      </div>

    </form>
  )
}

export default PlaceOrder