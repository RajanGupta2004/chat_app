import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const messageEndRef = useRef();
  const {
    getMessage,
    messages,
    selectedUser,
    isLoadingMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessage(selectedUser._id);
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    getMessage,
    selectedUser._id,
    unsubscribeFromMessages,
    subscribeToMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isLoadingMessage) {
    return <h1>Loading user message</h1>;
  }
  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            ref={messageEndRef}
            key={message._id}
            className={`chat  ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            } `}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      : selectedUser.profilePic ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50">
                {" "}
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img src={message.image} alt="image" className="w-[50%]" />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <div>
        <ChatMessage />
      </div>
    </div>
  );
};

export default ChatContainer;
