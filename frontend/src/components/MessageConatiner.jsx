import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'

const MessageConatiner = () => {

    const {selectedUser,authUser,onlineUsers} = useSelector(store=>store.user)
    const dispatch = useDispatch();

    const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser?._id);
    // useEffect(()=>{
    //     return() => dispatch(setSelectedUser(null))
    // },[])

    return (


        <>
        {
            selectedUser!==null ?(
                <div className='md:min-w-[550px] flex flex-col'>
                <div className='flex gap-2 items-center bg-slate-800 text-white px-4 py-1'>
                    <div className={`avatar ${isOnline ? 'online': ' '} `}>
                        <div className='w-10 rounded-full'>
                            <img src={selectedUser?.profilePhoto} alt='/profilepic.jpg' />
                        </div>
                    </div>

                    <div className='flex flex-col flex-1 '>
                        <div className='ml-2 flex-1'>
                            <p>{selectedUser?.fullname}</p>
                        </div>
                    </div>
                </div>

            <Messages/>

            <SendInput/>
            </div>

            ):(
           <div className='md:min-w-[550px] flex flex-col justify-center items-center '>
           <h1 className='text-3xl text-gray-500 font-bold'> Hi,{authUser?.fullname}</h1>
           <h1 className='text-2xl text-gray-700 '>Lets Start the Conversation</h1>
           </div>
            )
                
            
        }
        </>
           )
}

export default MessageConatiner