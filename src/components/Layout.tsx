import React from "react";
import { Outlet } from "react-router-dom";
import DrawerAppBar from "./DrawerAppBar";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", maxHeight: "100vh" }}>
      <DrawerAppBar />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
