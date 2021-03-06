const mongoose = require("mongoose");

const markSchema = mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    className: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    marks: [
      {
        type: Object,
        subject: String,
        theoryMark: Number,
        practicalMark: Number,
      },
    ],
  },
  { timestamps: true }
);

markSchema.index(
  { school: 1, exam: 1, className: 1, user: 1 },
  { unique: true }
);

module.exports = mongoose.model("Mark", markSchema);
