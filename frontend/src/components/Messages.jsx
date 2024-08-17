import React from 'react'
import SingleMessage from './SingleMessage'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'
import useGetRTMessage from '../hooks/useGetRTMessage'



const Messages = () => {
  
  useGetRTMessage()
  useGetMessages()

  const{messages} = useSelector(store=>store.message) 

  if (!messages) return ;
  if (!Array.isArray(messages)) return null;


  return (
    <div className='px-4 flex-1 overflow-auto'>

    {
     messages && messages?.map((message)=>{
        return(
          <SingleMessage key={message?._id} message={message}/>
        )
      })
    }
    
    </div>
  )
}

export default Messages