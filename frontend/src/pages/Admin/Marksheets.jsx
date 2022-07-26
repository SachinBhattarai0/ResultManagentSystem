import React, { useEffect, useState } from "react";
import Select from "../../components/form/Select";
import Button from "../../components/form/Button";
import { AiOutlinePrinter } from "react-icons/ai";
import NavBarContainer from "./../../components/NavBarContainer/NavBarContainer";
import Table from "../../components/Table/Table";
import Tr from "../../components/Table/Tr";
import Th from "../../components/Table/Th";
import Td from "../../components/Table/Td";
import { useAlert } from "../../context/AlertContext";
import Spinner from "../../components/Spinner/Spinner";
import {
  downloadStudentMarkheet,
  getClasses,
  getExams,
  getStudentByExamAndClass,
} from "../../utils/api";

const Marksheets = () => {
  const { updateAlert } = useAlert();
  const [filterValues, setFilterValue] = useState({ exams: [], classes: [] });
  const [studentList, setStudentList] = useState({
    students: [{ _id: "", rollNo: "", name: "" }],
    isPending: false,
  });
  const [filterByValues, setFilterByValues] = useState({
    examId: "",
    classId: "",
  });
  const { exams, classes } = filterValues;
  const { examId, classId } = filterByValues;
  const { students, isPending } = studentList;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilterByValues({ ...filterByValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await getStudentByExamAndClass(examId, classId);

    if (!res) return;
    if (res.error) return updateAlert(res.error);

    setStudentList({ ...studentList, students: res.studentList });
  };

  const handleStudentMarkSheetPrint = async (studentId) => {
    if (!studentId) return updateAlert("Student id is needed");
    const res = await downloadStudentMarkheet(studentId, examId);
    const blob = await res.blob();

    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "markSheet.pdf";
    a.click();
  };
  const handleClassMarkSheetPrint = (e) => {
    e.preventDefault();
    if (!classId || !examId) return updateAlert("class and exam are required");

    console.log(classId, examId);
  };

  useEffect(() => {
    const fetchExamAndClass = async () => {
      const exams = await getExams();
      const classes = await getClasses();
      setFilterValue({ exams, classes });
    };
    fetchExamAndClass();
  }, []);

  return (
    <NavBarContainer>
      <div className="bg-white m-4 rounded flex flex-col md:flex-row p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row w-full space-y-1 md:space-y-0 md:space-x-1"
        >
          <Select
            defaultVal="Select Exam:"
            name="examId"
            options={exams}
            onChange={handleChange}
          />
          <Select
            defaultVal="Select Class:"
            name="classId"
            options={classes}
            onChange={handleChange}
          />
          <Button style={{ background: "#0A2558" }}>Filter</Button>
          <Button
            style={{ background: "rgba(21,128,61,0.7)" }}
            onClick={handleClassMarkSheetPrint}
          >
            Print
          </Button>
        </form>
      </div>
      <div className="bg-white m-4 rounded flex flex-col p-4">
        <Table>
          <Tr>
            <Th>#</Th>
            <Th>Name</Th>
            <Th>Action</Th>
          </Tr>
          {students.map(
            (student, i) =>
              student._id && (
                <Tr key={i}>
                  <Td>{student.rollNo}</Td>
                  <Td>{student.name}</Td>
                  <Td>
                    <button
                      onClick={() => handleStudentMarkSheetPrint(student._id)}
                    >
                      <AiOutlinePrinter className="text-2xl text-green-700" />
                    </button>
                  </Td>
                </Tr>
              )
          )}
        </Table>
        {!students[0] && "Not found.."}
        {isPending && <Spinner h="h-20" w="w-20" />}
      </div>
    </NavBarContainer>
  );
};

export default Marksheets;
