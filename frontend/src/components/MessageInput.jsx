import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';
const MessageInput = () => {
  const [text, setText] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessages } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("please select an image!!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    }
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImgPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSendMessage = async (e) => {
    e.preventDefault(); // to prevent refershing the page
    if (!text.trim() && !imgPreview) return;

    try {
      await sendMessages({
        text: text.trim(),
        image: imgPreview
      })
      setText("");
      setImgPreview(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) { 
      toast.error("Failed to send Message");
    }
  };
  return (
    <div className='p-4 w-full'>
      {imgPreview && (
        <div className="flex items-center mb-3 gap-2">
          <div className="relative">
            <img src={imgPreview} alt="preview"
              className='w-20 h-20 object-cover rounded-lg border border-zinc-700' />
            <button
              onClick={removeImage}
              type='button'
              className='absolute -top-1.5 -right-1.5 w-5 h-5 bg-base-200 rounded-full flex items-center justify-center'>
              <X className='size-3' />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1  flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imgPreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imgPreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput