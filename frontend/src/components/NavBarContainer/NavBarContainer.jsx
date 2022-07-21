import React from "react";
import NavBar from "../Nav/NavBar";

const NavBarContainer = ({ children }) => {
  return (
    <div className="flex bg-gray-100 flex-col flex-1 h-screen overflow-y-scroll">
      <NavBar />
      <div className="mt-20 flex-1">{children}</div>
    </div>
  );
};

export default NavBarContainer;
