import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogingup: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      //   console.log(res);
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in atuth check", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      console.log(res);
      set({ authUser: res.data });
      toast.success("Account created successfully...");
    } catch (error) {
      console.log("Error in signup", error.response.message);
      set({ authUser: null });
      toast.error("Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("User logout ....");
    } catch (error) {
      console.log("Error in logout user", error);
      toast.error("something went wrong....");
    }
  },
}));
