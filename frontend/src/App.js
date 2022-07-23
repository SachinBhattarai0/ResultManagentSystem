import React from "react";
import SideNav from "./components/SideNav/SideNav";
import SignIn from "./pages/SignIn";
import Assignments from "./pages/Assignments.jsx";
import AssignmentMarks from "./pages/AssignmentMarks";
import NotFound from "./pages/NotFound";
import { TEACHER } from "./constants/userConstants";
import Protected from "./components/Protected/Protected";
import { Routes, Route } from "react-router-dom";
import Alert from "./components/Alert/Alert";

function App() {
  return (
    <div className="flex">
      <Alert />

      <Routes>
        <Route
          path="/"
          element={<Protected allowedRoles={[TEACHER]} el={<SideNav />} />}
        >
          <Route path="assignments/" element={<Assignments />} />
          <Route path="assignments/:id/" element={<AssignmentMarks />} />
        </Route>

        {/* <Route path="/admin" */}
        <Route path="auth/signIn/" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
