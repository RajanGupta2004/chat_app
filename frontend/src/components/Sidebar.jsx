import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

const Sidebar = () => {
  const { users, isLoadingUser, getUsers, setSelectedUser, selectedUser } =
    useChatStore();
  //   console.log(users);
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
      <div className=" overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {users?.map((user, index) => (
          <button
            key={user.id || index}
            onClick={() => setSelectedUser(user)}
            className={`flex w-full items-center gap-4 p-3 hover:bg-base-100 transition-all duration-150 cursor-pointer ${
              selectedUser?._id == user._id ? "bg-base-100" : ""
            }`}
          >
            {/* User Image */}
            <img
              src={user?.profilePic || "https://via.placeholder.com/150"}
              className="w-12 h-12 rounded-full object-cover"
              alt="User Avatar"
            />

            {/* User Info */}
            <div className="flex flex-col ">
              <h3 className="font-medium text-base">
                {user?.fullName || "Unknown User"}
              </h3>
              <p className="text-sm text-gray-500">
                {user?.status || "offline"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
