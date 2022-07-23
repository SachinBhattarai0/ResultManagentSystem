import React, { useEffect, useState } from "react";
import NavBarContainer from "../components/NavBarContainer/NavBarContainer";
import { useUserInfo } from "../context/UserInfoProvider";
import Button from "../components/form/Button";
import { Link } from "react-router-dom";
import { getAssignments } from "../utils/api";
import Spinner from "../components/Spinner/Spinner";
import Table from "../components/Table/Table";
import Tr from "../components/Table/Tr";
import Th from "../components/Table/Th";
import Td from "../components/Table/Td";

const Assignments = () => {
  const { userState } = useUserInfo();
  const [userAssignment, setuserAssignment] = useState({
    assignments: [],
    isPending: false,
  });

  useEffect(() => {
    const fetchAssignments = async () => {
      setuserAssignment({ ...userAssignment, isPending: true });

      const assignments = await getAssignments(userState.id);
      setuserAssignment({ assignments, isPending: false });
    };
    fetchAssignments();
  }, []);

  return (
    <NavBarContainer>
      <div className="px-3 py-5 bg-gray-100 flex-1 flex items-start justify-center">
        <Table>
          <Tr>
            <Th>#</Th>
            <Th>Exam</Th>
            <Th>Class</Th>
            <Th>Subject</Th>
            <Th>Action</Th>
          </Tr>

          {userAssignment.assignments.map((assignment, i) => (
            <Tr key={assignment._id}>
              <Td>{i + 1}</Td>
              <Td>
                {assignment.exam.year}-{assignment.exam.month}-
                {assignment.exam.date}
              </Td>
              <Td>{assignment.className.name}</Td>
              <Td>{assignment.subject.name}</Td>
              <Td>
                <Link to={`/assignments/${assignment._id}/`}>
                  <Button sm>View</Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Table>
      </div>

      {userAssignment.isPending && <Spinner h="h-20" w="w-20" />}
      {!userAssignment.isPending && !userAssignment.assignments[0] && (
        <div className="font-lg text-center">No Assignments</div>
      )}
    </NavBarContainer>
  );
};

export default Assignments;
