import React from "react";
import { NavLink } from "react-router-dom";

const NavLinkEl = ({ to, link, icon, extraClass, ...rest }) => {
  return (
    <NavLink
      to={to}
      className={`px-12 cursor-pointer flex items-center space-x-2 py-2 hover:bg-blue-500 ${extraClass}`}
      {...rest}
    >
      {icon}
      <span>{link}</span>
    </NavLink>
  );
};

export default NavLinkEl;
