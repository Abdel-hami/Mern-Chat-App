import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';

const ChatContainer = () => {

  const {nessages, getMessages,isMessagesLoading, sellecteduser} = useChatStore()
  useEffect(()=>{
    getMessages(sellecteduser._id)
  },[sellecteduser._id,getMessages]);

  if(isMessagesLoading) return (<div className='flex flex-1 flex-col overflow-auto'>
    <ChatHeader/>
    <MessageSkeleton/>
    <MessageInput/>
  </div>)


  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <p>messages...</p>
      <MessageInput/>
    </div>
  )
}

export default ChatContainer