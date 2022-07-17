const mongoose = require("mongoose");

const schoolSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, unique: true, required: true },
    address: { type: String, trim: true },
    contactNo: { type: Number, trim: true },
  },
  { timestamps: true }
);
schoolSchema.index({ name: 1 });
module.exports = mongoose.model("School", schoolSchema);
