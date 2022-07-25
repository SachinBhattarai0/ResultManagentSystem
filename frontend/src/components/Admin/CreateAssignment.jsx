import React, { useEffect, useState } from "react";
import Select from "../form/Select";
import Button from "../form/Button";
import {
  getExams,
  getClasses,
  getTeachers,
  getSubjects,
} from "../../utils/api";

const DEFAULT_STATE = {
  exams: [],
  classes: [],
  teachers: [],
  subjects: [],
};

const AddAssignment = () => {
  const [assignmentInfo, setAssignmentInfo] = useState(DEFAULT_STATE);
  const { exams, classes, teachers, subjects } = assignmentInfo;

  const fetchSubjectsForClass = async ({ target }) => {
    const subjects = await getSubjects(target.value);
    setAssignmentInfo({ ...assignmentInfo, subjects });
  };

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      const exams = await getExams();
      const classes = await getClasses();
      const teachers = await getTeachers();
      setAssignmentInfo({ ...assignmentInfo, exams, classes, teachers });
    };
    fetchAssignmentDetails();
  }, []);

  return (
    <div className="bg-white m-4 rounded flex flex-col p-4">
      <h1 className="text-xl">Create Assignments:</h1>
      <form className="py-4 space-y-2">
        <Select defaultVal="Select Exam" options={exams} />
        <Select
          defaultVal="Select Class"
          options={classes}
          onChange={fetchSubjectsForClass}
        />
        <Select defaultVal="Select To" options={teachers} />
        <Select defaultVal="Select Subject" options={subjects} />
        <Button
          extraClass="bg-dark-blue"
          style={{ padding: ".33rem .75rem", width: "100%" }}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default AddAssignment;
