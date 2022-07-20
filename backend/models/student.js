const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
    trim: true,
  },
  className: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
    trim: true,
  },
  rollNo: { type: Number, required: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  active:{type:Boolean,default:true}
});

module.exports = mongoose.model("Student", studentSchema);
