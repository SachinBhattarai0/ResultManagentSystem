import React from "react";
import SideNav from "./components/SideNav/SideNav";
import SignIn from "./pages/SignIn";
import Assignments from "./pages/Assignments.jsx";
import AssignmentMarks from "./pages/AssignmentMarks";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex">
      <Routes>
        <Route path="auth/signIn/" element={<SignIn />} />

        <Route path="/" element={<SideNav />}>
          <Route path="assignments/" element={<Assignments />} />
          <Route path="assignments/:id/" element={<AssignmentMarks />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
