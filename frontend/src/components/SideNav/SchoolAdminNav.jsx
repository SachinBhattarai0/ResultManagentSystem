import React from "react";
import { MdAssignment, MdAssignmentTurnedIn } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { FaUserGraduate } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import NavLinkEl from "./NavLinkEl";

const SchoolAdminNav = () => {
  return (
    <ul className="mt-4">
      <li>
        <NavLinkEl
          to="/admin/"
          link="ScholInfo"
          icon={<CgDetailsMore className="text-xl" />}
        />
      </li>
      <li>
        <NavLinkEl
          to="/admin/assignments/"
          link="Assignments"
          icon={<MdAssignment className="text-xl" />}
        />
      </li>
      <li>
        <NavLinkEl
          to="/admin/marksheets/"
          link="Marksheets"
          icon={<BsFileEarmarkSpreadsheet className="text-xl" />}
        />
      </li>
      <li>
        <NavLinkEl
          to="/admin/students/"
          link="Students"
          icon={<FaUserGraduate className="text-xl" />}
        />
      </li>
      <li>
        <NavLinkEl
          to="/admin/exam/"
          link="Exam"
          icon={<MdAssignmentTurnedIn className="text-xl" />}
        />
      </li>
      <li>
        <NavLinkEl
          to="/admin/class/"
          link="Class"
          icon={<SiGoogleclassroom className="text-xl" />}
        />
      </li>
      <li>
        <NavLinkEl
          to="/admin/users/"
          link="Users"
          icon={<BiUserCircle className="text-xl" />}
        />
      </li>
    </ul>
  );
};

export default SchoolAdminNav;
