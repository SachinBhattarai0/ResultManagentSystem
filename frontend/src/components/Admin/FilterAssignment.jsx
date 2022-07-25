import React, { useEffect, useState } from "react";
import Select from "../form/Select";
import Button from "../form/Button";
import Table from "../Table/Table";
import Tr from "../Table/Tr";
import Th from "../Table/Th";
import Td from "../Table/Td";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { getAssignmentsForSchool } from "../../utils/api";
import Spinner from "../Spinner/Spinner";

const FilterAssignment = () => {
  const [schoolAssignments, setSchoolAssignments] = useState({
    assignments: [],
    isPending: false,
  });
  const { assignments, isPending } = schoolAssignments;

  useEffect(() => {
    const fetchSchoolAssignments = async () => {
      setSchoolAssignments({ ...schoolAssignments, isPending: true });
      const res = await getAssignmentsForSchool();

      setSchoolAssignments({ isPending: false, assignments: res });
    };
    fetchSchoolAssignments();
  }, []);
  return (
    <div className="bg-white m-4 rounded flex flex-col p-4">
      <h1 className="text-xl">Filter Assignments:</h1>
      <form className="py-4 space-y-2">
        <Select
          defaultVal="Select Exam"
          options={[{ value: "val", label: "value" }]}
        />
        <Select
          defaultVal="Select Class:"
          options={[{ value: "val", label: "value" }]}
        />
        <Select
          defaultVal="Select To:"
          options={[{ value: "val", label: "value" }]}
        />
        <div className="flex items-center space-x-1">
          <label>Completed:</label>
          <input type="checkbox" className="h-5 w-5" />
        </div>
        <Button
          extraClass="bg-dark-blue"
          style={{ padding: ".33rem .75rem", width: "100%" }}
        >
          Filter
        </Button>
      </form>
      <div className="py-2 flex-1 flex flex-col items-start justify-center">
        <Table>
          <Tr>
            <Th>Exam</Th>
            <Th>Class</Th>
            <Th>Subject</Th>
            <Th>To</Th>
            <Th>Done</Th>
            <Th>Action</Th>
          </Tr>
          {assignments.map((item) => (
            <Tr>
              <Td>
                {item.exam?.year}-{item.exam?.month}-{item.exam?.date}
              </Td>
              <Td>{item.className?.name}</Td>
              <Td>{item.subject?.name}</Td>
              <Td>{item.to?.username}</Td>
              <Td>
                {item.completed ? (
                  <IoCheckmarkDoneCircle className="text-green-700 text-2xl m-auto" />
                ) : (
                  <ImCross className="text-red-700 text-xl m-auto" />
                )}
              </Td>
              <Td>
                <button assignment={item._id}>
                  <BiEdit className="text-2xl text-green-700" />
                </button>
                <button assignment={item._id}>
                  <RiDeleteBin2Line className="text-2xl text-red-700" />
                </button>
              </Td>
            </Tr>
          ))}
        </Table>

        {isPending && <Spinner h="h-20" w="w-20" />}
        {!isPending && !assignments[0] && (
          <div className="font-lg text-center">No Assignments</div>
        )}
      </div>
    </div>
  );
};
console.log("pagination");

export default FilterAssignment;
