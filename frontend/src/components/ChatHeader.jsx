import React from "react";
import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onLineUser } = useAuthStore();

  return (
    <div className="flex items-center justify-between bg-base-100 p-2">
      <div className="flex items-center gap-2">
        <img
          src={
            selectedUser?.profilePic ||
            "https://res.cloudinary.com/dykmhhtyj/image/upload/v1733578595/xbfc1h7fajnddp7cflor.jpg"
          }
          alt={selectedUser?.fullName}
          className="size-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{selectedUser?.fullName}</h3>
          <p className="text-sm">
            {onLineUser.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button onClick={() => setSelectedUser(null)}>
        <X className="cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatHeader;
