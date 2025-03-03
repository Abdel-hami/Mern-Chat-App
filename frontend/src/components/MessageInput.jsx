import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imgPreview, setImgPreview] = useState(null);
    const fileInputref = useRef(null);
    const {sendMessages} = useChatStore();

    const handleImageChange = (e) => {};
    const removeImage = () => {};
    const handleSendMessage = async(e) => {};
  return (
    <div className='p-4 w-full'>

    </div>
  )
}

export default MessageInput