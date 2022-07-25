import React from "react";
import { Outlet } from "react-router-dom";
import { useUserInfo } from "../../context/UserInfoProvider";
import { useNavInfo } from "../../context/NavInfoProvider";
import { BiLogOut } from "react-icons/bi";
import TeachersNav from "./TeachersNav";
import SchoolAdminNav from "./SchoolAdminNav";
import SuperUserNav from "./SuperUserNav";
import {
  TEACHER,
  SUPERUSER,
  SCHOOL_ADMIN,
} from "../../constants/userConstants";

const NavBar = () => {
  const { NavState } = useNavInfo();
  const { navOpen } = NavState;
  const { handleLogout } = useUserInfo();
  const { userState } = useUserInfo();

  return (
    <>
      <nav
        className={`bg-blue-800 text-white pt-5 flex justify-between flex-col h-screen${
          navOpen ? "  w-auto" : " w-0"
        }`}
      >
        <div>
          <h2 className="text-2xl text-center">SES</h2>
          {userState.role === TEACHER ? <TeachersNav /> : ""}
          {userState.role === SCHOOL_ADMIN ? <SchoolAdminNav /> : ""}
          {userState.role === SUPERUSER ? <SuperUserNav /> : ""}
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
