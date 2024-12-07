import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

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
      set({ authUser: res.data });
      toast.success("Account created successfully...");
    } catch (error) {
      console.log("Error in signup", error);
      set({ authUser: null });
      toast("Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log(res);
      set({ authUser: res.data });
      toast.success("login successfull");
    } catch (error) {
      console.log("Error in login", error);
      toast.error(" Error in login");
      set({ authUser: null });
    } finally {
      set({ isLogingup: false });
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

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("profil updated ....");
    } catch (error) {
      console.log("Error in update profile...");
      set({ authUser: null });
      set({ isUpdatingProfile: false });
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
