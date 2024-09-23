import { createContext, useEffect, useState } from "react";
import axios from 'axios'
 

export const StoreContext = createContext(null)
 const StoreContextProvider = (props)=>{
    const [cartItems, setCartItems] = useState({})
    const url = 'http://localhost:4000'
    const [token,setToken] = useState("")
    const [food_list, setFoodList] = useState([])
const addToCart = async(itemId)=>{
    if(!cartItems[itemId]){
        setCartItems((prev)=>(
            {...prev,[itemId]:1}
        ))
    }
    else{
        setCartItems((prev)=>(
            {...prev,[itemId]:prev[itemId]+1}
        ))
    }
    if(token){
await axios.post(url +'/api/cart/add',{itemId},{headers:{token}})
    }
}

const removeFromCart = async (itemId)=>{
setCartItems((prev)=>(
    {
        ...prev,[itemId]:prev[itemId]-1
    }
   
))
if(token){
await axios.post(url+'/api/cart/remove',{itemId}, {headers:{token}})
}
}

const getTotalCart=()=>{
let TotalAmount =0;
for(const item in cartItems){
if(cartItems[item]>0){
    let item_info = food_list.find((product)=>product._id === item)
    TotalAmount += item_info.price * cartItems[item]
}
    
}
return TotalAmount;

}
//redirect foodlist  to database
const fetchFoodList = async()=>{
    const response = await axios.get(url+'/api/food/list')
    setFoodList(response.data.data)
}

//const loadData
const loadCartData = async (token)=>{
    const response = axios.post(url+'/api/cart/get',{},{headers:{token}})
    setCartItems((await response).data.cartData)
}
useEffect(()=>{

async function loadData() {
await fetchFoodList()

if(localStorage.getItem("token")){
    setToken(localStorage.getItem("token"))
    await loadCartData(localStorage.getItem("token"))
}
loadData()
}

},[])
 
    const contextValue ={
food_list,
cartItems,
setCartItems,
addToCart,
removeFromCart,
getTotalCart,
url,
token,
setToken
    }
useEffect(()=>{
    console.log(cartItems)
},[cartItems])
   return (
    <StoreContext.Provider value={contextValue}>
{props.children}
    </StoreContext.Provider>
   )
 }
 export default StoreContextProvider