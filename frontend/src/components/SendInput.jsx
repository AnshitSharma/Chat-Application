import axios from 'axios';
import React, { useState } from 'react'
import { IoEyedropOutline, IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';


const SendInput = () => {
 
  const [inputMessage, setInputMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user)
  const {messages}= useSelector(store=>store.message)
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser?._id}`, { message: inputMessage }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      console.log(res);
      dispatch(setMessages([...messages,res?.data?.newMessage]))


    } catch (error) {
      console.log(error);

    }
    setInputMessage("")
   
  }
  return (
    <form onSubmit={onSubmitHandler} className='px-4 my-3'>
      <div className='w-full relative'>
        <input
          type='text'
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder='Enter Your Message'
          className='border text-sm rounded-lg w-full p-3 border-zinc-600  bg-gray-600 text-white '
        />
        <button type='submit' className='absolute flex items-center inset-y-0 end-0 pr-4'>

          <IoSendSharp />
        </button>
      </div>
    </form>
  )
}

export default SendInput