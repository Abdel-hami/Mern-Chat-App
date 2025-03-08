
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from 'socket.io-client'
const BASE_URL = import.meta.env.MODE === "development" ?  "http://localhost:5001": "/"
export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers:[],
    socket:null,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check"); // Vérifie la route
            set({ authUser: res.data });
            get().connectToSocket();
        } catch (error) {
            console.error("Error in useAuthStore:", error.message);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signUp: async (data) => {
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post("/auth/signup ", data);
            set({authUser:res.data});
            toast.success("Account created successfully");
            get().connectToSocket();

        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            set({isSigningUp:false});
        }
    },
    logout: async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null})
            toast.success("loged out successfully");
            get().disconnectToSocket()

        } catch (error) {
            toast.error(error.response.data.error);

        }
    },
    login: async(data)=>{
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({authUser:res.data})
            toast.success("Logged in successfully");
            get().connectToSocket();
        } catch (error) {
            toast.error(error.response.data.error);
        } finally{
            set({isLoggingIn: false})

        }
    },
    connectToSocket: ()=>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL,{
            query: {
                userId: authUser._id}
        });
        socket.connect();
        set({socket:socket});

        // we are listening for this event as soon as we log in, and when we got this event we are getting the user ids as data 
        socket.on("getOnlineUsers", (userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectToSocket: ()=>{
        if ( get().socket?.connected) get().socket.disconnect();
    },


    updateProfile: async(data)=>{
        set({isUpdatingProfile:true});
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({authUser:res.data})
            toast.success("Profile Updated successfully");
        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            set({isUpdatingProfile:false});

        }

    }
}));