import React from "react";
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellRing, House, Users } from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* Mobile overlay - only shows when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar - adjust height to account for navbar */}
      <div
        className={`fixed top-0 left-0 h-[calc(100vh-0px)] lg:h-[calc(100vh-58px)] w-64 flex flex-col bg-base-200 z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:static lg:z-10 lg:top-[58px]`}
      >
        {/* Top padding area */}
        <div className="h-16 lg:h-6"></div>

        {/* Scrollable navigation area */}
        <nav className="flex-1 flex flex-col p-4 space-y-1 overflow-y-auto">
          <Link
            to="/"
            className={`btn btn-ghost px-4 w-full justify-start rounded-3xl text-base font-medium ${
              currentPath === "/" ? "btn-active" : ""
            }`}
            onClick={() => onClose?.()}
          >
            <House className="size-5" />
            <span>Home</span>
          </Link>

          <Link
            to="/friends"
            className={`btn btn-ghost px-4 w-full justify-start rounded-3xl text-base font-medium ${
              currentPath === "/friends" ? "btn-active" : ""
            }`}
            onClick={() => onClose?.()}
          >
            <Users className="size-5" />
            <span>Friends</span>
          </Link>

          <Link
            to="/notifications"
            className={`btn btn-ghost px-4 w-full justify-start rounded-3xl text-base font-medium ${
              currentPath === "/notifications" ? "btn-active" : ""
            }`}
            onClick={() => onClose?.()}
          >
            <BellRing className="size-5" />
            <span>Notifications</span>
          </Link>
        </nav>

        {/* User Profile - always visible */}
        <div className="flex gap-4 p-6 items-center border-t border-base-300">
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
    </>
  );
}
