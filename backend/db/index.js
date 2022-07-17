const mongoose = require("mongoose");

const options = {
  autoIndex: true, //this is the code I added that solved it all
};

mongoose
  .connect("mongodb://127.0.0.1:27017/rms")
  .then(() => console.log("Connected to db"))
  .catch((e) => console.log(e));
