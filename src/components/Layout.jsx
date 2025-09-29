import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 mt-16 px-6">
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
