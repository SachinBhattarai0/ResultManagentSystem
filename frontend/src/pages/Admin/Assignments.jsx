import React from "react";
import NavBarContainer from "../../components/NavBarContainer/NavBarContainer";
import CreateAssignment from "../../components/Admin/CreateAssignment";
import FilterAssignment from "../../components/Admin/FilterAssignment";

const Assignments = () => {
  return (
    <NavBarContainer>
      <CreateAssignment />
      <FilterAssignment />
    </NavBarContainer>
  );
};

export default Assignments;
