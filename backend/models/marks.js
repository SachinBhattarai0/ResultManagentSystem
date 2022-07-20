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
      ref: "User",
      required: true,
    },
    marks: {
      type: [
        {
          subject:String,
          theoryMark: Number,
          practicalMark: Number,
        },
      ],
    },
    // subject: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Subject",
    //   required: true,
    // },
    // mark: {
    //   type: { theoryMark: Number, practicalMark: Number },
    //   required: true,
    // },
  },
  { timestamps: true }
);

markSchema.index(
  { school: 1, exam: 1, className: 1, user: 1 },
  { unique: true }
);

module.exports = mongoose.model("Mark", markSchema);
