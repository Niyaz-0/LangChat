import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children, showSidebar = true }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Single Navbar with responsive design */}
      <Navbar onToggleSidebar={toggleSidebar} showSidebar={showSidebar} />

      <div className="flex flex-1">
        {/* Sidebar - only show if showSidebar prop is true */}
        {showSidebar && <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />}

        {/* Main Content */}
        <main className={`flex-1 ${showSidebar ? "lg:ml-64" : ""} pt-4`}>
          {children}
        </main>
      </div>
    </div>
  );
}
