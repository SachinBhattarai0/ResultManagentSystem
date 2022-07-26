const express = require("express");
const userRoutes = require("./routes/user");
const schoolRoutes = require("./routes/school");
const assignmentRoutes = require("./routes/assignment");
const subjectRoutes = require("./routes/subject");
const classRoutes = require("./routes/class");
const examRoutes = require("./routes/exam");
const marksRoutes = require("./routes/marks");
const studentRoutes = require("./routes/students");
const pdfRoutes = require("./pdf/routes");
const cors = require("cors");
require("dotenv").config();
require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/school", schoolRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/class", classRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/marks", marksRoutes);

app.use("/api/pdf", pdfRoutes);

app.listen(8000, () => console.log("Listening at port 8000"));
