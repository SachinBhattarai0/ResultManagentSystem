const express = require("express");
const userRouter = require("./routes/user");
const schoolRouter = require("./routes/school");
require("./db");

const app = express();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/school", schoolRouter);

app.listen(8000, () => console.log("Listening at port 8000"));
