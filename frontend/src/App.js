import React from "react";
import SideNav from "./components/SideNav/SideNav";
import SignIn from "./pages/SignIn";
import Assignments from "./pages/Assignments.jsx";
import AssignmentMarks from "./pages/AssignmentMarks";
import NotFound from "./pages/NotFound";
import { TEACHER, SCHOOL_ADMIN } from "./constants/userConstants";
import Protected from "./components/Protected/Protected";
import { Routes, Route } from "react-router-dom";
import Alert from "./components/Alert/Alert";
import SchoolInfo from "./pages/Admin/SchoolInfo";
import CompletedAssignment from "./pages/CompletedAssignment";
import AllAssignments from "./pages/Admin/Assignments";

function App() {
  return (
    <div className="flex">
      <Alert />

      <Routes>
        <Route
          path="/assignments/"
          element={<Protected allowedRoles={[TEACHER]} el={<SideNav />} />}
        >
          <Route index element={<Assignments />} />
          <Route path="completed/" element={<CompletedAssignment />} />
          <Route path=":assignmentId/" element={<AssignmentMarks />} />
        </Route>

        <Route
          path="/admin/"
          element={<Protected allowedRoles={[SCHOOL_ADMIN]} el={<SideNav />} />}
        >
          <Route index element={<SchoolInfo />} />
          <Route path="assignments/" element={<AllAssignments />} />
        </Route>

        <Route path="auth/signIn/" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
