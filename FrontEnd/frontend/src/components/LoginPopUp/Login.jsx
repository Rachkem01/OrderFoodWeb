import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/Context'
import axios from 'axios'

const Login = ({setShowLogin}) => {
  const {url, token, setToken} = useContext(StoreContext)
    const[currentState, setCurrentState] = useState("Log in")
    const [data, setData] = useState({
      name:'',
      email:'',
      password:''
    })
const onChangeHandler = (event)=>{
const name = event.target.name;
const value = event.target.value;
setData(data=>({...data,[name]:value}))

}
const onLogin = async(event)=>{
event.preventDefault()
let newUrl = url;
if(currentState==="Log in"){
newUrl += '/api/user/login'
}
else{
  newUrl +='/api/user/register'
}
const response = await axios.post(newUrl, data)

if(response.data.success){
setToken(response.data.token)
localStorage.setItem("token", response.data.token)
setShowLogin(false)
}

else{
alert(response.data.message)
}
}
  return (
    <div className='login'>
    <form  className="login-container" onSubmit={onLogin}>
        <div className="login-title">
        <h2>{currentState}</h2>
        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}/>
        </div>
        <div className="login-input">
            {currentState ==="Log in"?<></>:<input onChange={onChangeHandler}  value={data.name} name='name' type='text' placeholder='Your-name' required />}
        
        <input onChange={onChangeHandler} value={data.email}  type='text' name='email' placeholder='Your-email' required/>
        <input onChange={onChangeHandler}  value={data.password} type='password'name='password' placeholder='password' required/>
        </div>
        <button type='submit'>{currentState ==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-condition">
           <input type='checkbox' required/>
           <p>By continuing, I agree to the terms of use of private plolicy.</p> 
        </div>
        {
            currentState ==="Log in"?<p>Create a new account <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p> : <p>Already have an account? <span onClick={()=>setCurrentState("Log in")}>Login here</span></p>
        }
        
       
    </form>
    </div>
  )
}

export default Login