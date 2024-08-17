import React, { useState } from 'react'
import { ImSearch } from "react-icons/im";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';
import OtherUsers from './OtherUsers';

const Sidebar = () => {

  const [search, setSearch] = useState("")


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { otherUsers } = useSelector(store => store.user)

  const logoutHandler = async () => {
    try {

      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`)
      navigate("/login")
      toast.success(res.data.message);
      dispatch(setAuthUser(null))
    } catch (error) {
      console.log(error);

    }
  }
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    );
    console.log(otherUsers, conversationUser);

    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User Not Found");
    }
  };


  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form onSubmit={searchSubmitHandler} action='' className='flex items-center gap-2'>
        <input className='input input-bordered rounded-md'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type='text'
          placeholder='Search...' />
        <button type='summit' className='btn btn-outline '>
          <ImSearch size="24px" />
        </button>
      </form>
      <div className='divider px-3'>
      </div>
      <OtherUsers />
      <div className='mt-2'>
        <button className='btn btn-sm' onClick={logoutHandler} > Logout</button>
      </div>
    </div>
  )
}

export default Sidebar