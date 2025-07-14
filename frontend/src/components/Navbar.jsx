import { BellIcon, Languages, LogOut, Menu } from "lucide-react";
import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logout } from "../lib/api";
import { Link, useNavigate } from "react-router";
import Loader from "./Loader"
import ThemeSelector from "./ThemeSelector";

export default function Navbar({ onToggleSidebar, showSidebar = true }) {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logout Successfull");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  if(isPending) return <Loader />

  return (
    <div className="sticky top-0 z-20 flex items-center px-4 sm:px-6 justify-between py-3 bg-base-200">
      <div className="flex items-center gap-2">
        {/* Menu icon - only shown on mobile when sidebar is enabled */}
        {showSidebar && (
          <button 
            onClick={onToggleSidebar} 
            className="btn btn-ghost btn-sm p-1 lg:hidden"
          >
            <Menu className="size-6" />
          </button>
        )}

        {/* LOGO - responsive sizing */}
        <Link to="/" className="flex items-center">
          <h1 className="flex gap-2 sm:gap-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent items-center">
            <Languages className="text-primary size-7 sm:size-9" />
            <span className="text-xl sm:text-3xl md:text-4xl font-bold">LangChat</span>
          </h1>
        </Link>
      </div>

      <div>
        <div className="flex items-center gap-3 sm:gap-8">
          <Link to="/notifications">
            <BellIcon className="size-5 sm:size-6" />
          </Link>
          
          <ThemeSelector />

          <div className="w-7 sm:w-8 rounded-full">
            <img src={authUser.profilePic} alt="Profile pic"/>
          </div>
          <button type="button" onClick={() => mutate()}>
            <LogOut className="size-5 sm:size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
