import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'



const Login = () => {

  const [user, setUser] = useState({
    
    username: "",
    password: "",
   
  })

const dispatch = useDispatch();

const navigate =useNavigate();

  const onSummitHandler = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/login`, user, {
        headers: {
          "Content-Type": "application/json",
        }, withCredentials: true
      })
      navigate("/homepage")

      dispatch(setAuthUser(res.data))
      
 

    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);

    }

    setUser({
     
      username: "",
      password: "",
     
    })

  }
  return (
    <div className='min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100
'>
        <h1 className='text-3xl font-bold text-center text-black '>
         Login
        </h1>
        <form onSubmit={onSummitHandler} action=''>
         
          <div>
            <label className='label p-2 '>
              <span className='text-base label-text text-black'>User Name</span>
            </label>
            <input 
            type='text' 
            value={user.username}
            onChange={(e)=>setUser({...user,username:e.target.value})}
            placeholder='Enter Your Username' 
            className='w-full input input-bordered h-10 bg-white' />
          </div>
          <div>
            <label className='label p-2 '>
              <span className='text-base label-text text-black'>Password</span>
            </label>
            <input 
            type='password' 
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder='Enter Your Password' 
            className='w-full input input-bordered h-10 bg-white' />
          </div>
         
          
          <Link to="/register">
            Don't  have an account?
          </Link>
          <div className=''>
            <button type="submit" className='btn btn-block btn-sm mt-2 border-slate-700 bg-white'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}



export default Login