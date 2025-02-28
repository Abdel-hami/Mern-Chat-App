import {create} from  "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios"

export const useChatStore = create((set)=>({
    messages:[],
    users:[],
    sellecteduser:null,
    isUserLoading: false,
    isMessagesLoading: false,


    getUsers: async()=>{
        
    }
}))