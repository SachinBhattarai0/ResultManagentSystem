import { Navigate } from "react-router-dom";
import { postRequest } from "./postRequest";

export const getAssignments = async (userId) => {
  const jwtToken = getJwtToken();
  if (!userId || !jwtToken) return;

  let res = await postRequest(
    "assignment/",
    { userId },
    { Authorization: "Bearer " + jwtToken }
  );

  if (res.status !== 200) return handleError();

  res = await res.json();
  return res.assignments;
};

export const getAssignmentInfo = async (assignmentId) => {
  const jwtToken = getJwtToken();
  if (!assignmentId || !jwtToken) return;

  let res = await postRequest(
    `assignment/${assignmentId}/`,
    {},
    { Authorization: "Bearer " + jwtToken }
  );
  if (res.status !== 200) return handleError();
  res = await res.json();

  return res;
};

export const createMarks = async (assignmentId, marksInfo) => {
  const jwtToken = getJwtToken();

  if (!assignmentId || !marksInfo || !jwtToken) return;

  let res = await postRequest(
    "marks/create/",
    { assignmentId, marksInfo },
    { Authorization: "Bearer " + jwtToken }
  );
  if (res.status !== 200) return handleError();
  res = await res.json();

  return res;
};

const getJwtToken = () => localStorage.getItem("jwtToken");
const removeJwtToken = () => localStorage.removeItem("jwtToken");
const handleError = () => {
  removeJwtToken();
  <Navigate to={"/auth/signIn"} replace />;
};
