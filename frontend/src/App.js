
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  io  from "socket.io-client"
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';





const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,

  },
  {
    path: "/homepage",
    element: <HomePage />,

  },
  {
    path: "/register",
    element: <Signup/>,

  },
  {
    path: "/login",
    element: <Login />,

  }

]) 

function App() {
  
  const {authUser} = useSelector((store)=>store.user)
  const {socket} = useSelector((store)=>store.socket)
  const dispatch = useDispatch();


  useEffect(()=>{
    if (authUser) {
      const socket = io('http://localhost:8080',{
        query:{
          userId:authUser._id
        }
      })
      dispatch(setSocket(socket))

      socket.on('connection', () => {
        console.log('Connected to server');
      });

      socket.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      })
      return ()=>socket.close();
    }else{
      if (socket) {
          socket.close();
          dispatch(setSocket(null))
      }
    }
  },[authUser])

  return (
    <div className="p-4 h-screen  flex items-center justify-center">
     <RouterProvider router={router}/>
    </div>
  );
}

export default App;
