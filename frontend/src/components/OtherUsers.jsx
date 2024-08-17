import React from 'react'
import OtherSingleUser from './OtherSingleUser'
import useGetOtherUser from '../hooks/useGetOtherUser';
import { useSelector } from 'react-redux';

const OtherUsers = () => {
    //custom hook
    useGetOtherUser();
    const { otherUsers } = useSelector(store => store.user)
    if (!otherUsers) return; //early return in react

    return (
        <div className='overflow-auto flex-1'>
            {otherUsers?.map((user) => {
                return (
                    <OtherSingleUser key={user._id} user={user} />
                )

            })}

        </div>
    )
}

export default OtherUsers