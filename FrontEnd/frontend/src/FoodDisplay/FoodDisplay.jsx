import React from 'react'
import "./FoodDisplay.css"
import { useContext } from 'react'
import { StoreContext } from '../Context/Context'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)
  return (
    <div className='food-diaplay' id='food-display'>
<h2>Top dishes near you</h2>
<div className="food-display-list">
    {food_list.map((item,index)=>{
    if(category ==="All" || category ===item.category){
        return(
            <FoodItem key={index} id={item._id} name={item.name} image={item.image} description={item.description} price={item.price} category={index.category} /> 
         )
    }
       
    })}
</div>
    </div>
  )
}

export default FoodDisplay