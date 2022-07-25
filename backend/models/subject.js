const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
    className: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    theoryMark: { type: Number, default: 75, required: true },
    practicalMark: { type: Number, default: 25, required: true },
    passMark: { type: Number, default: 40, required: true },
  },
  { timestamps: true }
);

subjectSchema.index({ school: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Subject", subjectSchema);
