import React, { useContext, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { userContext } from './App'
import axios from 'axios';



function Navbar() {

  const {user, setUser} = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout=()=>{
    axios.get('http://localhost:3001/logout', {withCredentials:true})
    .then(res => {
      if(res.data === 'Success'){
        // navigate(0);
        window.location.href ='/'; 
      }
    })
    .catch(err => console.log(err))
  }
  
  return (
    <div className='flex justify-between bg-[#ebdc3ddc]'>
     <div><h1 className="text-xl md:text-3xl sm:text-2xl font-bold my-3 mx-5 md:mx-7 md:my-5 text-green-500">Blog</h1></div>
       <div>
        <ul className='flex justify-center'>
          <li className='my-3 mx-3 md:my-5 md:mx-7 md:text-2xl hover:bg-slate-200 rounded-[5px] px-1 cursor-pointer text-auto font-semibold  text-black'><Link to='/'>Home</Link></li>
          {
              (user && user.username)?
              <li className='my-3 mx-3 md:my-5 md:mx-7 md:text-2xl hover:bg-slate-200 rounded-[5px] px-1 cursor-pointer text-auto font-semibold  text-black'><Link to='/create'>Create</Link></li>
              :
              <></>
          }
          <li className='my-3 mx-3 md:my-5 md:mx-7 md:text-2xl hover:bg-slate-200 rounded-[5px] px-1 cursor-pointer text-auto font-semibold  text-black'><Link to='/contact'>Contact</Link></li>
        </ul>
       </div>
       {
       (user && user.username)?
        <div className="text-auto md:text-2xl font-semibold cursor-pointer hover:bg-slate-200 rounded-[5px] px-1 mx-5 my-3 md:mx-7 text-blue-600 md:my-5">
          <input type="button" onClick={handleLogout} value="Logout" />
        </div>
        :
        <div className="text-auto md:text-2xl font-semibold cursor-pointer hover:bg-slate-200 rounded-[5px] px-1 mx-5 my-3 md:mx-7 text-blue-600 md:my-5"><Link to="/login">Login</Link></div>
       }
    </div>
  )
}
export default Navbar