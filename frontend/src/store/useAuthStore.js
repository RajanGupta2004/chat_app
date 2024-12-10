import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:8000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogingup: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onLineUser: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      //   console.log(res);
      set({ authUser: res.data });
      get().connectSocket();
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
      get().connectSocket();
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
      set({ authUser: res.data });
      toast.success("login successfull");
      get().connectSocket();
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
      get().disConnectSockent();
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

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser && get().socket?.connect) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onLineUser: userIds });
    });
  },

  disConnectSockent: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
