import React, { useContext, useState } from 'react'
import './NavBar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/Context'
const NavBar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("menu")
  const{getTotalCart, token, setToken} = useContext(StoreContext)
  const logOut = ()=>{
localStorage.removeItem("token")
setToken("")
const navigate = useNavigate()
navigate('/')
  }
  return (
    <div className='navbar'>
   <Link to='/'> <img src={assets.logo} alt='' className='logo'/></Link>
    <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
        <a  href= "#explore-menu"onClick={()=>setMenu("Menu")}className={menu==="Menu"?"active":""}>Menu</a>
        <a href='#app-download'onClick={()=>setMenu("Mobile-app")} className={menu==="Mobile-app"?"active":""}>Mobile-app</a>
        <a href='#footer' onClick={()=>setMenu("Contact Us")} className={menu==="Contact Us"?"active":""}>Contact Us</a>
    </ul>
    <div className="navbar-right">
        <img src={assets.search_icon} alt=''/>
    <div className="navbar-search-icon">
      <Link to='/cart'> <img src={assets.basket_icon}/></Link> 
        <div className={getTotalCart()===0?"":"dot"}></div>
    </div>
    {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button> :<div className='navbar-profile'>
    <img src={assets.profile_icon} alt=''/>
    <ul className="navbar-profile-dropdown">
      <li><img src={assets.bag_icon} alt=''/><p>Orders</p></li>
      <hr/>
      <li onClick={logOut}><img src={assets.logout_icon} alt=''/><p>Log Out</p></li>
    </ul>
      </div>}
    
    </div>
    </div>
  )
}

export default NavBar