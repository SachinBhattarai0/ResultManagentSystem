const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to db"))
  .catch((e) => console.log(e));
