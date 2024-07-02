import { createContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import axios from 'axios'
import Create from './Create'
import Contact from './Contact'
import Post from './Post'
import Editpost from './Editpost'

export const userContext = createContext();

function App() {
  
  const [user, setUser] = useState();      //For login and changing the login/logout in navbar
  const [val, setVal] = useState();       //To put the values 

  useEffect(()=>{
    axios.get('http://localhost:3001/', {withCredentials:true})
    .then(res =>{
      // res have email and username get from the backend '/' route
      setUser(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  return (
  <userContext.Provider value={{user, setUser, val, setVal}}>
   <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/create" element={<Create/>}></Route>
      <Route path="/contact" element={<Contact/>}></Route>
      <Route path="/post/:id" element={<Post/>}></Route>
      <Route path="/editpost/:id" element={<Editpost/>}></Route>
    </Routes>
   </BrowserRouter>
  </userContext.Provider>
  )
}

export default App
