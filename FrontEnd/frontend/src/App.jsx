import React, { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import {Route, Routes, useNavigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'

import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Login from './components/LoginPopUp/Login'
import Cart from './pages/Cart/Cart'
const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
<NavBar setShowLogin={setShowLogin}/>
<Routes>
  <Route path='/' element={<Home/>}></Route>
 <Route path='/cart' element={<Cart/>}></Route>
  <Route path='/placeorder' element={<PlaceOrder/>}></Route>


</Routes>
<Footer/>
    </div>
    </>
  )
}

export default App