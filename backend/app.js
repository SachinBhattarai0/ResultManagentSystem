const express = require("express");
const userRoutes = require("./routes/user");
const schoolRoutes = require("./routes/school");
const assignmentRoutes = require("./routes/assignment");
const subjectRoutes = require("./routes/subject");
const classRoutes = require("./routes/class");
const examRoutes = require("./routes/exam");
const cors = require("cors");
require("dotenv").config();
require("./db");
console.log("test assignmentMark ROute");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/school", schoolRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/class", classRoutes);
app.use("/api/exam", examRoutes);

app.listen(8000, () => console.log("Listening at port 8000"));
