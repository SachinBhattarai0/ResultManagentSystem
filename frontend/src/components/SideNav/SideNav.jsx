import React from "react";
import { Outlet } from "react-router-dom";
import { MdAssignment, MdAssignmentTurnedIn } from "react-icons/md";
import { useUserInfo } from "../../context/UserInfoProvider";
import { useNavInfo } from "../../context/NavInfoProvider";
import { CgDetailsMore } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import NavLinkEl from "./NavLinkEl";

const NavBar = () => {
  const { NavState } = useNavInfo();
  const { navOpen } = NavState;
  const { handleLogout } = useUserInfo();

  return (
    <>
      <nav
        className={`bg-blue-800 text-white pt-5 flex justify-between flex-col h-screen${
          navOpen ? "  w-auto" : " w-0"
        }`}
      >
        <div>
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
          </ul>
        </div>

        <button className="flex space-x-1 mx-auto mb-1" onClick={handleLogout}>
          <BiLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
