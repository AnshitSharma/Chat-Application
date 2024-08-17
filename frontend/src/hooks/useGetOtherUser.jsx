import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { setOtherUsers } from '../redux/userSlice';


const useGetOtherUser = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUser = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:8080/api/v1/user/`)
                
                //store 
                dispatch(setOtherUsers(res.data))

            } catch (error) {
                console.log(error);

            }

        }
        fetchOtherUser();
    }, [])
    return (
        <div>useGetOtherUser</div>
    )
}

export default useGetOtherUser