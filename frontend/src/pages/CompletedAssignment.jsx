import React, { useEffect, useState } from "react";
import { useUserInfo } from "../context/UserInfoProvider";
import Table from "../components/Table/Table";
import Tr from "../components/Table/Tr";
import Th from "../components/Table/Th";
import Button from "../components/form/Button";
import Td from "../components/Table/Td";
import { Link } from "react-router-dom";
import NavBarContainer from "../components/NavBarContainer/NavBarContainer";
import { getCompletedAssignments } from "../utils/api";
import Spinner from "../components/Spinner/Spinner";

const AssignmentCompleted = () => {
  const [completedAssignment, setCompletedAssignments] = useState({
    assignments: [],
    isPending: false,
  });
  const { userState } = useUserInfo();

  useEffect(() => {
    const fetchAssignments = async () => {
      setCompletedAssignments({ ...completedAssignment, isPending: true });
      const res = await getCompletedAssignments(userState.id);

      setCompletedAssignments({
        ...completedAssignment,
        assignments: res,
        isPending: false,
      });
    };
    fetchAssignments();
  }, []);

  return (
    <NavBarContainer>
      <div className="p-2">
        <Table>
          <Tr>
            <Th>Class</Th>
            <Th>Subject</Th>
            <Th>Completed At</Th>
            <Th>Action</Th>
          </Tr>
          {completedAssignment.assignments.map((assignment) => (
            <Tr key={assignment._id}>
              <Td>{assignment.className.name}</Td>
              <Td>{assignment.subject.name}</Td>
              <Td>
                {assignment.exam.year}-{assignment.exam.month}-
                {assignment.exam.date}
              </Td>
              <Td>
                <Link
                  to={`/assignment/completed/${assignment._id}/`}
                  state={assignment}
                >
                  <Button
                    extraClass="bg-dark-blue"
                    style={{ padding: ".33rem .75rem" }}
                  >
                    View
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Table>
        {completedAssignment.isPending && <Spinner h="h-20" w="w-20" />}
        {!completedAssignment.isPending &&
          !completedAssignment.assignments[0] && (
            <div className="font-lg text-center">No Assignments completed</div>
          )}
      </div>
    </NavBarContainer>
  );
};

export default AssignmentCompleted;
