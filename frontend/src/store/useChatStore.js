import {create} from  "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios"
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get)=>({
    messages:[],
    users:[],
    sellecteduser:null,
    isUsersLoading: false,
    isMessagesLoading: false,
    socket:null,

    getUsers: async()=>{
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users:res.data});
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isUsersLoading:false});

        }
    },
    getMessages: async(userId)=>{
        set({isMessagesLoading:true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isMessagesLoading:false});

        }
    },
    sendMessages: async(messageData)=>{
        const {messages,sellecteduser} = get();
        try {
            const res = await axiosInstance.post(`messages/send/${sellecteduser._id}`, messageData);
            set({messages:[...messages, res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    // to optimize it later
    subscribeToMessage: ()=>{
        const {sellecteduser} = get();
        if(!sellecteduser) return;

        const socket = useAuthStore.getState().socket;
        
        socket.on("newMessage", (newMessage)=>{
            set({messages:[...get().messages, newMessage]})
        })
    },
    UnSubscribeFromMessage: ()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
    // to optimize it later

    setSelecteduser: (sellecteduser) =>{set({sellecteduser})}

}))