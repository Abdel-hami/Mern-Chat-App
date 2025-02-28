
// import {create} from "zustand";
// import { axiosInstance } from "../lib/axios";

// export const useAuthStore = create((set) => ({
//     authUser: null,
//     isSigningUp: false,
//     isLogingIn: false,
//     isupdatingProfile: false,

//     checkAuth: async () => {
//         try {
//             const res = await axiosInstance.get("/auth/check");
//             set({authUser:res.data});
//         } catch (error) {
//             console.log("error in useAuthStore: ", error.message)
//             set({authUser:null});
//         } finally {
//             set({iscCheckingAuth: false});
//         }
//     },
//     iscCheckingAuth: true,
// }))

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check"); // Vérifie la route
            set({ authUser: res.data });
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
        } catch (error) {
            toast.error(error.response.data.error);
        } finally{
            set({isLoggingIn: false})

        }
    }
}));