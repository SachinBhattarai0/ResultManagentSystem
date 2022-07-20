const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    className: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    completed:{type:Boolean,required:true,default:false}
  },
  { timestamps: true }
);

assignmentSchema.index(
  { school: 1, className: 1, subject: 1 },
  { unique: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
