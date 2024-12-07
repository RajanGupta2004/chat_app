import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isLoadingUser: false,
  isLoadingMessage: false,

  getUsers: async () => {
    try {
      set({ isLoadingUser: true });
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data.sideBarUser });
    } catch (error) {
      console.log("Error in get users", error);
      toast.error("Something went wrongg..");
    } finally {
      set({ isLoadingUser: false });
    }
  },

  getMessage: async (userId) => {
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("Error in get user message", error);
    } finally {
      set({ isLoadingMessage: false });
    }
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));
