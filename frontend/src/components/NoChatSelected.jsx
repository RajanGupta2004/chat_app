import React from "react";
import { FiMessageSquare } from "react-icons/fi";

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full  rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <div className="bg-blue-100 p-6 rounded-full">
          <FiMessageSquare className="text-blue-500 text-6xl" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold text-gray-800">
          No Chat Selected
        </h1>
        <p className="mt-2 text-gray-600 text-center max-w-sm">
          Select a conversation from the sidebar or start a new one to see
          messages here.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
