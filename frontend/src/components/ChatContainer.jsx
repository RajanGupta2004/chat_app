import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";

const ChatContainer = () => {
  const { getMessage, messages, selectedUser, isLoadingMessage } =
    useChatStore();

  useEffect(() => {
    getMessage(selectedUser._id);
  }, [getMessage, selectedUser._id]);

  if (isLoadingMessage) {
    return <h1>Loading user message</h1>;
  }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <p>message..............</p>
      <ChatMessage />
    </div>
  );
};

export default ChatContainer;
