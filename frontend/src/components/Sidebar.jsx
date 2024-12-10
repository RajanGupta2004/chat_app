import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { users, isLoadingUser, getUsers, setSelectedUser, selectedUser } =
    useChatStore();

  const { onLineUser } = useAuthStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isLoadingUser) {
    return (
      <aside className="h-full w-20 lg:w-72 bg-base-300 flex items-center justify-center">
        <h1 className="text-lg font-semibold animate-pulse">
          Loading Users...
        </h1>
      </aside>
    );
  }

  return (
    <aside className="h-full w-20 lg:w-72 bg-base-300 border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-base-200">
        <h2 className="text-xl font-bold hidden lg:block">Chats</h2>
      </div>

      {/* User List */}
      <div className="  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {users?.map((user, index) => (
          <button
            key={user.id || index}
            onClick={() => setSelectedUser(user)}
            className={`  flex w-full items-center gap-4 p-3 hover:bg-base-100 transition-all duration-150 cursor-pointer ${
              selectedUser?._id == user._id ? "bg-base-100" : ""
            }`}
          >
            <div className="relative">
              {/* User Image */}
              <img
                src={user?.profilePic || "https://via.placeholder.com/150"}
                className="w-12 h-12 rounded-full object-cover"
                alt="User Avatar"
              />
              {onLineUser.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User Info */}
            <div className="flex flex-col ">
              <h3 className="font-medium text-base">
                {user?.fullName || "Unknown User"}
              </h3>
              <p className="text-sm text-gray-500">
                {onLineUser.includes(user._id) ? "online" : "offline"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
