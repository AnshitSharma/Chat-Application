import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast"
const Signup = () => {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  })

  const navigate =useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender })
  }

  const onSummitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/register`, user, {
        headers: {
          "Content-Type": "application/json",
        }, withCredentials: true
      })
      if (res.data.success) {
        navigate("/login")
        toast.success(res.data.message);
      }
 

    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);

    }

    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })

  }
  return (
    <div className='min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100
'>
        <h1 className='text-3xl font-bold text-center text-black '>
          Signup
        </h1>
        <form onSubmit={onSummitHandler} action=''>
          <div>
            <label className='label p-2 '>
              <span className='text-base label-text text-black'>Full Name</span>
            </label>
            <input type='text'
              placeholder='Enter Your Name'
              className='w-full input input-bordered h-10 bg-white'
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
            />
          </div>
          <div>
            <label className='label p-2 '>
              <span className='text-base label-text text-black'>User Name</span>
            </label>
            <input type='text' placeholder='Enter Your Username' className='w-full input input-bordered h-10 bg-white'
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div>
            <label className='label p-2 '>
              <span className='text-base label-text text-black'>Password</span>
            </label>
            <input type='password'
              placeholder='Enter Your Password'
              className='w-full input input-bordered h-10 bg-white'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div>
            <label className='label p-2 '>
              <span className='text-base label-text text-black'>Confirm Password</span>
            </label>
            <input type='password'
              placeholder='Enter Your Confirm Password'
              className='w-full input input-bordered h-10 bg-white'
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
          </div>
          <div className='flex mt-2 ml-2'>
            <div className=' text-black mr-10'>
              <p>
                Male
              </p>
              <input
                type="checkbox"
                checked={user.gender === 'male'}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="checkbox" />

            </div>
            <div className='text-black'><p>
              Female
            </p>
              <input
                type="checkbox"
                checked={user.gender === 'female'}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="checkbox" />
            </div>
          </div>
          <Link to="/login">
            Already have account?
          </Link>
          <div className=''>
            <button type="submit" className='btn btn-block btn-sm mt-2 border-slate-700 bg-white'> Signup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup