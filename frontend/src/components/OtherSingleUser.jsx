import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const OtherSingleUser = ({ user }) => {


    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user)

    const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user?._id);

    const selectedUserHandler = (user) => {

        dispatch(setSelectedUser(user));

    }


    return (
        <>
            <div
                onClick={() => selectedUserHandler(user)}
                className={`text-white ${selectedUser?._id === user?._id ? 'font-semibold bg-zinc-300' : ''} flex gap-2 items-center hover:bg-gray-300 rounded-xl p-2 cursor-pointer`}
            >
                <div className={`avatar ${isOnline ? 'online' : ' '}`}>
                    <div className='w-10 rounded-full'>
                        <img src={user?.profilePhoto} alt='/profilepic.jpg' />
                    </div>
                </div>

                <div className='flex flex-col flex-1 '>
                    <div className='ml-2 flex-1'>
                        <p className='text-black'>{user?.fullname}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </>
    )
}

export default OtherSingleUser