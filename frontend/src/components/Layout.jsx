import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children, showSidebar }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {showSidebar && <Sidebar />}

        {/* Children */}
        <div className={`flex-1 p-4 ${showSidebar ? "ml-64" : ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
