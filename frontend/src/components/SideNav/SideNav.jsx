import React from "react";
import { Outlet } from "react-router-dom";
import { MdAssignment, MdAssignmentTurnedIn } from "react-icons/md";
import { useNavInfo } from "../../context/NavInfoProvider";
import { CgDetailsMore } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import NavLinkEl from "./NavLinkEl";

const NavBar = () => {
  const { NavState } = useNavInfo();
  const { navOpen } = NavState;

  return (
    <>
      <nav
        className={`bg-blue-800 text-white py-5 h-screen${
          navOpen ? "  w-auto" : " w-0"
        }`}
      >
        <h2 className="text-2xl text-center">SES</h2>
        <ul className="mt-4">
          <li>
            <NavLinkEl
              to="/myinfo/"
              link="My info"
              icon={<CgDetailsMore className="text-xl" />}
            />
          </li>
          <li>
            <NavLinkEl
              to="/assignments/"
              link="Assignments"
              icon={<MdAssignment className="text-xl" />}
            />
          </li>
          <li>
            <NavLinkEl
              to="/assignment/completed/"
              link="Completed"
              icon={<MdAssignmentTurnedIn className="text-xl" />}
            />
          </li>
          <li>
            <NavLinkEl
              to="/logout/"
              link="Logout"
              icon={<BiLogOut className="text-xl" />}
              extraClass="absolute bottom-0 hover:bg-transparent"
            />
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
