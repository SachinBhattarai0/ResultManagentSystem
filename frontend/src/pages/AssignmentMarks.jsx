import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBarContainer from "../components/NavBarContainer/NavBarContainer";
import Button from "../components/form/Button";
import Table from "../components/Table/Table";
import Tr from "../components/Table/Tr";
import Th from "../components/Table/Th";
import Td from "../components/Table/Td";
import { getAssignmentInfo } from "../utils/api";

const DEFAULT_STATE = {
  _class: "",
  exam: "",
  subject: "",
  practicalMark: "",
  theoryMark: "",
  studentList: [],
};

const AssignmentMarks = () => {
  const { assignmentId } = useParams();
  const [assignmentInfo, setAssignmentInfo] = useState(DEFAULT_STATE);
  const { _class, exam, subject, practicalMark, theoryMark, studentList } =
    assignmentInfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  useEffect(() => {
    const fetchAssignmentInfo = async () => {
      const res = await getAssignmentInfo(assignmentId);
      const {
        class: _class,
        exam,
        subject,
        practicalMark,
        theoryMark,
        studentList,
      } = res;

      setAssignmentInfo({
        _class,
        exam: `${exam.year}-${exam.month}-${exam.year}`,
        subject,
        practicalMark,
        theoryMark,
        studentList,
      });
    };

    fetchAssignmentInfo();
  }, []);

  return (
    <NavBarContainer>
      <div className="px-3 py-5 flex-1 flex flex-col items-start justify-center">
        <div className="flex justify-between w-full">
          <span>
            <b>Exam: </b>
            {exam}
          </span>
          <span>
            <b>Class: </b>
            {_class}
          </span>
          <span>
            <b>Subject: </b>
            {subject}
          </span>
        </div>
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <Table>
            <Tr>
              <Th rowSpan={2}>RollNo</Th>
              <Th rowSpan={2}>Name</Th>
              <Th colSpan={2}>Marks</Th>
            </Tr>
            <Tr>
              <Th>Th</Th>
              <Th>Pr</Th>
            </Tr>
            {studentList.map((student, i) => (
              <Tr key={student._id}>
                <Td>{student.rollNo}</Td>
                <Td>{student.name}</Td>
                <Td>
                  <input
                    type="number"
                    min={0}
                    max={theoryMark}
                    className="w-20 outline-none border border-gray-200 p-1 focus:border-bluish rounded"
                  />
                </Td>
                <Td>
                  <input
                    type="number"
                    min={0}
                    max={practicalMark}
                    className="w-20 outline-none border border-gray-200 p-1 focus:border-bluish rounded"
                  />
                </Td>
              </Tr>
            ))}
          </Table>
          <Button full>Submit</Button>
        </form>
      </div>
    </NavBarContainer>
  );
};

export default AssignmentMarks;
