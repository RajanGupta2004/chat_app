import React from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <div className="container mx-auto h-16 px-4 shadow-sm">
      <div className="flex justify-between  w-full gap-2 p-4">
        <div>
          <h1>Chatt App</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden lg:block">setting</span>
          </Link>
          {authUser && (
            <>
              <Link to="/profile" className="flex items-center gap-2">
                <CircleUserRound className="w-4 h-4" />
                <span className="hidden lg:block">User</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2"
                onClick={() => logout()}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:block">logout</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
