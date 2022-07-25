import React from "react";
import { MdAssignment, MdAssignmentTurnedIn } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import NavLinkEl from "./NavLinkEl";

const TeachersNav = () => {
  return (
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
          to="/assignments/completed/"
          link="Completed"
          icon={<MdAssignmentTurnedIn className="text-xl" />}
        />
      </li>
    </ul>
  );
};

export default TeachersNav;
