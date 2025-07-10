import React from "react";
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellRing, House, Users } from "lucide-react";

export default function Sidebar() {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;


  return (
    <div className="fixed top-0 left-0 h-screen w-64 flex flex-col justify-between pt-24 bg-base-200 z-10 ">
      {/* Navigation Links */}
      <nav className="flex flex-col p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost px-4 w-full justify-start rounded-3xl text-base font-medium ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <House className="size-5" />
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost px-4 w-full justify-start rounded-3xl text-base font-medium ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <Users className="size-5" />
          <span>Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost px-4 w-full justify-start rounded-3xl text-base font-medium ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellRing className="size-5" />
          <span>Notifications</span>
        </Link>
      </nav>

      {/* User Profile */}
      <div className="flex gap-4 p-6 items-center">
        <img
          src={authUser?.profilePic}
          alt="profile pic"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-medium">{authUser.username}</span>
          <span className="flex items-center text-success gap-2">
            <span className="w-2 h-2 rounded-full bg-success inline-block"></span>
            Online
          </span>
        </div>
      </div>
    </div>
  );
}
