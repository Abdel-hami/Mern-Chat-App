import zustand from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = zustand.create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLogingIn: false,
    isupdatingProfile: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/ckeck");
            set({authUser:res.data});
        } catch (error) {
            console.log("error in useAuthStore: ", error.message)
            set({authUser:null});
        } finally {
            set({iscCheckingAuth: false});
        }
    },

    iscCheckingAuth: true,
}))