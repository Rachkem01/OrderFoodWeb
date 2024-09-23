import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({url}) => {
   
    const [image, setImage] = useState(false)
    const [data,setData] = useState({
        name:'',
        price:'',
        description:'',
        category:"Salad"
    })
const onChangeHandler = (e)=>{
const name = e.target.name;
const value = e.target.value;
setData(data=>({...data,[name]:value}))

}

//to handle proper submission
const onSubmitHandler = async (event)=>{
event.preventDefault()
const formdata  = new FormData()
//append by fieldname
formdata.append("name",data.name)
formdata.append("description",data.description)
formdata.append("price",Number(data.price))
formdata.append("category",data.category)
formdata.append("image", image)

const response = await axios.post(`${url}/api/food/add`, formdata)
if(response.data){
setData({
    name:'',
        price:'',
        description:'',
        category:"Salad"
})
setImage(false)
toast.success(response.data.message)
}else{
toast.error(response.data.message)
}
}
// useEffect(()=>{
// console.log(data) to confirm if data is stoted
// },[data])
  return (
    <div className='add'>
    <form className='flex-col' onSubmit={onSubmitHandler}>
    <div className="add-img-upload flex-col">
        <p>Upload Image</p>
    <label htmlFor='image'>
    <img src={image?URL.createObjectURL(image):assets.upload_area}/>
    </label>
<input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
    </div>

<div className="add-product-name flex-col">
    <p>Product name</p>
    <input onChange={onChangeHandler} type='text' name='name'  value={data.name}placeholder='Type here'/>
</div>


<div className="add-product-description flex-col">
    <p>Product description</p>
   <textarea onChange={onChangeHandler}  value={data.description}name='description' rows='6' placeholder='Write description here'></textarea>
</div>
<div className="add-category-price">
<div className="add-category flex-col">
<p>Product Category</p> 
<select name='category' onChange={onChangeHandler} value={data.category}>
    <option value='Salad'>Salad</option>
    <option value='Roll'>Mols</option>
    <option value='Dessert'>Desserts</option>
    <option value= 'Sandwich'>Sandwich</option>
    <option value='Cake'>Cake</option>
    <option value='Appetizer'>Appetizer</option>
    <option value='Fries'>Fries</option>
    <option value='Sauce'>Sauce</option>
</select>
</div>
<div className="add-price flex-col">
    <p>Product Price</p>
    <input type='number' name='price' placeholder='#500' onChange={onChangeHandler} value={data.price}></input>
</div>
</div>
<button type='submit' className='add-btn'>Add</button>
    </form>
    </div>
  )
}

export default Add