import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice";

const useGetRTMessage = () => {
  
  const { socket } = useSelector((store) => store.socket)
  const { messages } = useSelector((store) => store.message)
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        dispatch(setMessages([...messages, newMessage]))
      })

      // Clean up function
      return () => {
        socket.off("newMessage");
      }
    }
  }, [socket, dispatch, messages])
}

export default useGetRTMessage