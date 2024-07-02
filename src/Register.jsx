import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register(){
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const Navigate = useNavigate();

    const submitDetails = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', {username, email, password})
        .then(res => {console.log(res)
            Navigate('/login')})
        .catch(err => console.log(err))
    }
  return (
    <div className='flex justify-center'>
        <div className='flex flex-col w-[400px] bg-[#e8e8a2] mt-16 m-10 border-2 rounded-[7px] p-[5px]'>
            <h3 className='flex justify-center underline rounded-[5px] px-32 m-1 my-2 font-bold'><span>Sign Up</span></h3>
            <form onSubmit={submitDetails}>
                <div className='flex flex-col mx-2 justify-center'>
                    <label htmlFor="name" className='block rounded-[5px] px-32 m-1 '>Username:</label>
                    <input className='w-[370px] border border-black rounded-[5px]' type="text" onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className='flex flex-col mx-2 justify-center'>
                    <label htmlFor="email" className='block rounded-[5px] px-32 m-1'>Email:</label>
                    <input className='w-[370px] border border-black rounded-[5px]' type="email" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className='flex flex-col mx-2 justify-center'>
                    <label htmlFor="password" className='block rounded-[5px] px-32 m-1 '>Password:</label>
                    <input className='w-[370px] border border-black rounded-[5px]' type="password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className='flex my-1 justify-center'>
                <button className='block border-2 cursor-pointer border-black rounded-[5px] w-[370px] m-1 bg-sky-400'>Sign Up</button>
                </div>
            </form>
        </div>
    </div>
  )
}
