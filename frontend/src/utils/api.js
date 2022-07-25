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

export const getCompletedAssignments = async (userId) => {
  const jwtToken = getJwtToken();
  if (!userId || !jwtToken) return;

  let res = await postRequest(
    "assignment/completed/",
    { userId },
    { Authorization: "Bearer " + jwtToken }
  );

  if (res.status !== 200) return handleError();

  res = await res.json();
  return res.assignments;
};

export const getStudentList = async (assignmentId) => {
  const jwtToken = getJwtToken();
  if (!assignmentId || !jwtToken) return;

  let res = await postRequest(
    `assignment/student-list/`,
    { assignmentId },
    { Authorization: "Bearer " + jwtToken }
  );
  // if (res.status !== 200) return handleError();
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

export const getExams = async () => {
  const jwtToken = getJwtToken();
  if (!jwtToken) return;

  let res = await postRequest(
    "exam/get-all/",
    {},
    { Authorization: "Bearer " + jwtToken }
  );
  if (res.status !== 200) return handleError();
  res = await res.json();

  return res.exams;
};

export const getClasses = async () => {
  const jwtToken = getJwtToken();
  if (!jwtToken) return;

  let res = await postRequest(
    "class/get-all/",
    {},
    { Authorization: "Bearer " + jwtToken }
  );
  if (res.status !== 200) return handleError();
  res = await res.json();

  return res.classes;
};
export const getTeachers = async () => {
  const jwtToken = getJwtToken();
  if (!jwtToken) return;

  let res = await postRequest(
    "user/get-all/",
    {},
    { Authorization: "Bearer " + jwtToken }
  );
  if (res.status !== 200) return handleError();
  res = await res.json();

  return res.teachers;
};

export const getSubjects = async (classId) => {
  const jwtToken = getJwtToken();
  if (!jwtToken || !classId) return;

  let res = await postRequest(
    "subject/get-all/",
    { classId },
    { Authorization: "Bearer " + jwtToken }
  );
  if (res.status !== 200) return handleError();
  res = await res.json();

  return res.subjects;
};

export const createAssignment = async ({
  examId,
  classId,
  subjectId,
  teacherId,
}) => {
  const jwtToken = getJwtToken();

  if (!examId || !classId || !subjectId || !teacherId || !jwtToken) return;

  let res = await postRequest(
    "assignment/create/",
    { examId, classId, subjectId, teacherId },
    { Authorization: "Bearer " + jwtToken }
  );

  return await res.json();
};

export const getAssignmentsForSchool = async (schoolId = "") => {
  const jwtToken = getJwtToken();
  if (!jwtToken) return;

  let res = await postRequest(
    "assignment/school/",
    { schoolId },
    { Authorization: "Bearer " + jwtToken }
  );

  // if (res.status !== 200) return handleError();

  res = await res.json();
  return res.assignments;
};

const getJwtToken = () => localStorage.getItem("jwtToken");
const removeJwtToken = () => localStorage.removeItem("jwtToken");
const handleError = () => {
  removeJwtToken();
  <Navigate to={"/auth/signIn"} replace />;
};
