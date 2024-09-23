import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/Context'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
const {cartItems,food_list, removeFromCart, getTotalCart, url} = useContext(StoreContext)
const navigate = useNavigate()


  return (
    <div>
    <div className='cart'>
        <div className="cart-items">
    <div className="cart-items-title">
      <p>Items</p>
      <p>Title</p>
      <p>Price</p>
      <p>Quantity</p>
      <p>Total</p>
      <p>Remove</p>
    </div>
    <br/>
    <hr/>
    {
      food_list.map((item, index)=>{
        
if(cartItems[item._id] > 0){
  return(
    <div key={item._id}>
    <div className='cart-items-title cart items-item'>
<img src={url+'/images/'+item.image} alt='' />
<p>{item.name}</p>
<p>{item.price}</p>
<p>{cartItems[item._id]}</p>
<p>#{item.price *cartItems[item._id]}</p>
{/* <p>{getTotalCart()}</p> */}
<p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>

    </div>
     <hr/>
    </div>
  )
}
      })
    }
        </div>
    </div>
    <div className="cart-bottom">
   <div className="cart-total">
    <h2>Cart Total</h2>
    <div className='cart-total-detals'></div>
    <p>SubTotal</p>
    <p>{getTotalCart()}</p>
    <hr/>
    <div className='cart-total-detals'>
      <p>Delivery Fee</p>
      <p>{getTotalCart()===0?0:'2'}</p>
    </div><hr/>
    <div className='cart-total-detals'>
      <b>Total</b>
      <b>{getTotalCart()===0?0:getTotalCart()+2}</b>
    </div>
    <button onClick={()=>navigate('/placeorder')}>Proceed to Check out</button>
    <div className="cart-promocode">
      <p>If you have a promo code, Enter it here</p>
      <div className="cart-promocode-input">
        <input type='text' placeholder='promocode'/>
      <button type='submit'>Submit</button>
      </div>
    </div>
    </div>
   </div>

    </div>
  )
}

export default Cart