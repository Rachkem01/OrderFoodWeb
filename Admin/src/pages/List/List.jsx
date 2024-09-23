import React from 'react'
import './List.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
 
const List = ({url}) => {

    const [list, setList] = useState([])
    const fetchList = async ()=>{
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data){
setList(response.data.data)
console.log(response.data)
    }else{
toast.error(response.data.message)
    }
}
//fetch data
useEffect(()=>{
fetchList()
},[])
//removefood
const removefood =async(foodId)=>{
const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
await fetchList()
if(response.data){
    toast.success(response.data.message)
}else{
    toast.error(response.data.message)
}
}
  return (
   
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Actions</b>

        </div>
         {list.map((item,index)=>{
            return(
        <div key={index} className='list-table-format'>
        <img  src={`${url}/images/`+item.image} alt=''/>
        <p>{item.name}</p>
        <p>{item.category}</p>
        <p>{item.price}</p>
        <p  onClick={()=>removefood(item._id)}className='cursor'>x</p>
        
        </div>
            )
        })} 
        </div>

    </div>
  )
}

export default List