import React, { useEffect, useState } from "react";
import Select from "../form/Select";
import Button from "../form/Button";
import { useAlert } from "../../context/AlertContext";
import { SUCCESS } from "../../constants/messgeConstants";
import Spinner from "../Spinner/Spinner";
import {
  getExams,
  getClasses,
  getTeachers,
  getSubjects,
  createAssignment,
} from "../../utils/api";

const DEFAULT_STATE = {
  exams: [],
  classes: [],
  teachers: [],
  subjects: [],
  isPending: false,
};

const AddAssignment = () => {
  const { updateAlert } = useAlert();
  const [assignmentInfo, setAssignmentInfo] = useState(DEFAULT_STATE);
  const { exams, classes, teachers, subjects, isPending } = assignmentInfo;

  const fetchSubjectsForClass = async ({ target }) => {
    const subjects = await getSubjects(target.value);
    setAssignmentInfo({ ...assignmentInfo, subjects });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};

    [...e.target].forEach(({ name, value }) => {
      data[name] = value;
    });

    const missingKey = Object.entries(data)
      .map(([key, value]) => !value && key)
      .filter((item) => item)[0];

    if (missingKey) updateAlert(`${missingKey} is missing!`);
    else {
      setAssignmentInfo({ ...assignmentInfo, isPending: true });
      const res = await createAssignment(data);

      setAssignmentInfo({ ...DEFAULT_STATE });
      if (res.error) return updateAlert(res.error);
      else return updateAlert(res.message, SUCCESS);
    }
  };

  return (
    <div className="bg-white m-4 rounded flex flex-col p-4">
      <h1 className="text-xl">Create Assignments:</h1>
      <form className="py-4 space-y-2" onSubmit={handleSubmit}>
        <Select defaultVal="Select Exam" name="examId" options={exams} />
        <Select
          defaultVal="Select Class"
          name="classId"
          options={classes}
          onChange={fetchSubjectsForClass}
        />
        <Select
          defaultVal="Select Teacher"
          name="teacherId"
          options={teachers}
        />
        <Select
          defaultVal="Select Subject"
          name="subjectId"
          options={subjects}
        />
        <Button
          extraClass="bg-dark-blue"
          style={{
            padding: ".33rem .75rem",
            width: "100%",
            pointerEvents: isPending ? "none" : "all",
          }}
        >
          {isPending ? <Spinner /> : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default AddAssignment;
