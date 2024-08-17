import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const SingleMessage = ({ message }) => {

  const scrollRef = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  const messageTime = new Date(message?.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div ref={scrollRef}>
      <div className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Profile"
              src={
                message?.senderId === authUser?._id
                  ? authUser?.profilePhoto
                  : selectedUser?.profilePhoto
              }
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50 text-black">{messageTime}</time>
        </div>
        <div className="chat-bubble">{message?.message}</div>
      </div>
    </div>
  );
};

export default SingleMessage;
