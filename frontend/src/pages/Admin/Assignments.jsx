import React, { useEffect, useState } from "react";
import NavBarContainer from "../../components/NavBarContainer/NavBarContainer";
import CreateAssignment from "../../components/Admin/CreateAssignment";
import FilterAssignment from "../../components/Admin/FilterAssignment";
import { getClasses, getExams, getTeachers } from "../../utils/api";

const DEFAULT_ASSIGNMENT_STATE = {
  exams: [],
  classes: [],
  teachers: [],
  subjects: [],
  isPending: false,
};

const Assignments = () => {
  const [assignmentInfo, setAssignmentInfo] = useState(
    DEFAULT_ASSIGNMENT_STATE
  );
  const { isPending } = assignmentInfo;

  useEffect(() => {
    if (isPending) return;
    const fetchAssignmentDetails = async () => {
      const exams = await getExams();
      const classes = await getClasses();
      const teachers = await getTeachers();

      setAssignmentInfo({ ...assignmentInfo, exams, classes, teachers });
    };

    fetchAssignmentDetails();
  }, [isPending]);

  return (
    <NavBarContainer>
      <CreateAssignment
        assignmentInfo={assignmentInfo}
        setAssignmentInfo={setAssignmentInfo}
        defaultState={DEFAULT_ASSIGNMENT_STATE}
      />
      <FilterAssignment
        assignmentInfo={assignmentInfo}
        setAssignmentInfo={setAssignmentInfo}
        defaultState={DEFAULT_ASSIGNMENT_STATE}
      />
    </NavBarContainer>
  );
};

export default Assignments;
