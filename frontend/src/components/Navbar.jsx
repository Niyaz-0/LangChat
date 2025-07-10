import { BellIcon, Languages, LogOut } from "lucide-react";
import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logout } from "../lib/api";
import { Link, useNavigate } from "react-router";
import Loader from "./Loader"
import ThemeSelector from "./ThemeSelector";

export default function Navbar() {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logout Successfull");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // setTimeout(() => {
      //   window.location.reload()
      // }, 1000)
    },
  });

  if(isPending) return <Loader />

  return (
    <div className="sticky top-0 z-20 flex items-center px-6 justify-between py-3 bg-base-200">
      {/* LOGO */}
      <Link to="/" className="flex items-center">
        <h1 className="flex gap-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent items-center">
          <Languages className="text-primary" size={38} />
          <span className="text-4xl font-bold">LangChat</span>
        </h1>
      </Link>

      <div>
        <div className="flex items-center gap-8">
          <Link to="/notifications" >
            <BellIcon className="size-6" />
          </Link>
          
          <ThemeSelector />

          <div className="w-8 rounded-full" >
            <img src={authUser.profilePic} alt="Profile pic"/>
          </div>
          <button type="button" onClick={() => mutate()} >
            <LogOut className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
