const mongoose = require("mongoose");

const classSchema = mongoose.Schema(
  {
    school: { type: String, trim: true },
    name: { type: String, trim: true, unique: true, required: true },
  },
  { timestamps: true }
);

classSchema.index({ school: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Class", classSchema);
