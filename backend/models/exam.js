const mongoose = require("mongoose");

const examSchema = mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  date: { type: Number, required: true },
  school: { type: mongoose.Schema.Types.ObjectId, required: true },
});

examSchema.index({ year: 1, month: 1, date: 1, school: 1 }, { unique: true });

module.exports = mongoose.model("Exam", examSchema);
