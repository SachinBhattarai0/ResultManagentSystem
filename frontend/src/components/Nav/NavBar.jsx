import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiMenuAlt1 } from "react-icons/hi";
import { useNavInfo } from "../../context/NavInfoProvider";

const NavBar = () => {
  const { toggleNavState, NavState } = useNavInfo();
  const { navOpen, title } = NavState;
  return (
    <div className="flex items-center p-5 w-full text-2xl fixed top-0 bg-white z-20">
      {navOpen ? (
        <HiMenuAlt1 onClick={toggleNavState} className="cursor-pointer" />
      ) : (
        <AiOutlineMenu onClick={toggleNavState} className="cursor-pointer" />
      )}
      <span className={`hidden${navOpen && " sm:block"}`}>{title}</span>
    </div>
  );
};

export default NavBar;
