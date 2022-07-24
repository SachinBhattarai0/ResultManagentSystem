import React, { useEffect, useState, useRef } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import NavBarContainer from "../components/NavBarContainer/NavBarContainer";
import Button from "../components/form/Button";
import Table from "../components/Table/Table";
import Tr from "../components/Table/Tr";
import Th from "../components/Table/Th";
import Td from "../components/Table/Td";
import { getAssignmentInfo } from "../utils/api";
import { createMarks } from "../utils/api";
import Spinner from "../components/Spinner/Spinner";
import { SUCCESS } from "../constants/messgeConstants";

const DEFAULT_STATE = {
  assignment: { className: {}, exam: {}, subject: {} },
  studentList: [],
  isPending: false,
};

const AssignmentMarks = () => {
  const navigate = useNavigate();
  const { assignmentId } = useParams();
  const { updateAlert } = useAlert();
  const focusedTheoryInputRef = useRef();
  const focusedPracticalInputRef = useRef();
  const [theoryMarks, setTheoryMarks] = useState({});
  const [practicalMarks, setPracticalMarks] = useState({});
  const [focusedTheoryInputIndex, setfocusedTheoryInputIndex] = useState();
  const [focusedPracticalInputIndex, setfocusedPracticalInputIndex] =
    useState();
  const [assignmentInfo, setAssignmentInfo] = useState(DEFAULT_STATE);
  const { assignment, studentList } = assignmentInfo;
  const { className, exam, subject } = assignment;
  const { theoryMark, practicalMark } = subject;

  const handleButtonClick = async () => {
    const invalidTheoryMarkIndex = Object.values(theoryMarks).findIndex(
      (i) => i > theoryMark
    );
    const invalidPracticalMarkIndex = Object.values(practicalMarks).findIndex(
      (i) => i > practicalMark
    );
    if (
      Object.values(theoryMarks).length !== studentList.length ||
      Object.values(practicalMarks).length !== studentList.length
    )
      return updateAlert("Some values are missing");

    if (invalidTheoryMarkIndex >= 0)
      return updateAlert(
        `Invalid theory mark at ${
          invalidTheoryMarkIndex + 1
        } must be less than ${theoryMark}`
      );

    if (invalidPracticalMarkIndex >= 0)
      return updateAlert(
        `Invalid practical mark at ${
          invalidPracticalMarkIndex + 1
        } must be less than ${practicalMark}`
      );

    const marksArr = studentList.map(({ _id }) => {
      return {
        studentId: _id,
        theoryMark: theoryMarks[_id] || 0,
        practicalMark: practicalMarks[_id] || 0,
      };
    });

    const res = await createMarks(assignmentId, marksArr);
    updateAlert(res.message, SUCCESS);
    navigate("/assignments/", { replace: true });
  };

  const handleTheoryMarkChange = ({ target }) => {
    let newMarks = { ...theoryMarks };
    newMarks[target.name] = parseInt(target.value);

    setTheoryMarks(newMarks);
  };

  const handlePracticalMarkChange = ({ target }) => {
    let newMarks = { ...practicalMarks };
    newMarks[target.name] = parseInt(target.value);

    setPracticalMarks(newMarks);
  };

  const handleKeyDownOnTheoryInput = ({ key, target }, i) => {
    if (key === "Backspace" && target.value === "")
      setfocusedPracticalInputIndex(i - 1);

    if (key === "Enter") setfocusedPracticalInputIndex(i);
    setfocusedTheoryInputIndex(null);
  };

  const handleKeyDownOnPracticalInput = ({ key, target }, i) => {
    if (key === "Backspace" && target.value === "")
      setfocusedTheoryInputIndex(i);

    if (key === "Enter") setfocusedTheoryInputIndex(i + 1);
    setfocusedPracticalInputIndex(null);
  };

  useEffect(() => {
    focusedPracticalInputRef.current?.focus();
    focusedTheoryInputRef.current?.focus();
  }, [focusedTheoryInputIndex, focusedPracticalInputIndex]);

  useEffect(() => {
    const fetchAssignmentInfo = async () => {
      setAssignmentInfo({ ...assignmentInfo, isPending: true });
      const res = await getAssignmentInfo(assignmentId);

      setAssignmentInfo({ ...res, isPending: false });
    };

    fetchAssignmentInfo();
  }, []);

  return (
    <NavBarContainer>
      <div className="px-3 py-5 flex-1 flex flex-col items-start justify-center">
        <div className="flex justify-between w-full">
          <span>
            <b>Exam: </b>
            {exam?.date}-{exam?.month}-{exam?.year}
          </span>
          <span>
            <b>Class: </b>
            {className?.name}
          </span>
          <span>
            <b>Subject: </b>
            {subject?.name}
          </span>
        </div>
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
          {studentList?.map((student, i) => (
            <Tr key={student._id}>
              <Td>{student.rollNo}</Td>
              <Td>{student.name}</Td>
              <Td>
                <input
                  type="number"
                  name={student._id}
                  ref={
                    focusedTheoryInputIndex === i ? focusedTheoryInputRef : null
                  }
                  onChange={handleTheoryMarkChange}
                  onKeyDown={(e) => handleKeyDownOnTheoryInput(e, i)}
                  className="w-20 outline-none border p-1 focus:border-bluish rounded"
                />
              </Td>
              <Td>
                <input
                  type="number"
                  name={student._id}
                  ref={
                    focusedPracticalInputIndex === i
                      ? focusedPracticalInputRef
                      : null
                  }
                  onChange={handlePracticalMarkChange}
                  onKeyDown={(e) => handleKeyDownOnPracticalInput(e, i)}
                  className="w-20 outline-none border p-1 focus:border-bluish rounded"
                />
              </Td>
            </Tr>
          ))}
        </Table>
        {assignmentInfo.isPending && <Spinner h="h-20" w="w-20" />}
        <Button onClick={handleButtonClick} full>
          Submit
        </Button>
      </div>
    </NavBarContainer>
  );
};

export default AssignmentMarks;
