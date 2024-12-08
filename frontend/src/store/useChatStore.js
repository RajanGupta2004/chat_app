import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
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

  sendMessage: async (messageData) => {
    try {
      const { selectedUser, messages } = get();

      console.log(messageData, 12);

      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      // console.log("res", res.data);

      set({ messages: [...messages, res.data.newMessage] });
      toast.success("Message send successfully...");
    } catch (error) {
      console.log("Erroe in send message", error);
      toast.error("something went wrong");
    }
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));
