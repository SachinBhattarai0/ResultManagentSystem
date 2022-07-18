const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      res: "School",
      required: true,
    },
    className: {
      type: mongoose.Schema.Types.ObjectId,
      res: "Classe",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      res: "Subject",
      required: true,
    },
    to: { type: mongoose.Schema.Types.ObjectId, res: "User", required: true },
  },
  { timestamps: true }
);

assignmentSchema.index(
  { school: 1, className: 1, subject: 1 },
  { unique: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
