import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Editpost() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    // const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();
    // const [posts, setPosts]= useState({});
  
    const handleSubmit = (e)=>{
      e.preventDefault();
    //   const formData = new FormData();
    //   formData.append('title', title);
    //   formData.append('description', description);
    //   formData.append('file', file);
  
      axios.put(`http://localhost:3001/editpost/${id}`, {title, description}, {withCredentials:true})
      .then(res =>{
          if(res){
            // window.location.href = '/';
            navigate('/');
          }
      })
      .catch(err => console.log(err))
    }

    useEffect(()=>{
        axios.get(`http://localhost:3001/getpostsbyid/${id}`)
        .then(res =>{
        //   setPosts(res.data)
          // console.log(res.data)
          setTitle(res.data.title);
          setDescription(res.data.description);
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <div className='flex justify-center sm:mx-80 sm:px-20 my-1 py-5 px-10 rounded-md'>
    <div>
      <form className='flex justify-center' onSubmit={handleSubmit}>
        <div className='flex flex-col sm:w-96 sm:px-[19px] px-1 w-60 bg-[#eada2edc] rounded-md'>
        <label htmlFor="" className='mx-3 font-bold'>Title:</label>
        <input className='sm:w-80 w-52 h-10 m-3 border-2 border-black rounded-md' type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <label htmlFor="" className='mx-3 font-bold'>Post:</label>
        <textarea className='sm:w-80 w-52 h-32 m-3 border-2 border-black rounded-md' value={description} name="" id="" onChange={e => setDescription(e.target.value)}></textarea>
        {/* <label htmlFor="" className='mx-3 font-bold'>File:</label> */}
        {/* <input className='m-3 rounded-md' type="file" onChange={e => setFile(e.target.files[0])}/> */}
        <button className='sm:w-80 w-52 h-10 m-3 rounded-md border-2 cursor-pointer border-black bg-sky-400'>Update</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Editpost
