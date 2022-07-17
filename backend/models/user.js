const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const USER_ROLES = ["teacher", "student", "schoolAdmin", "superUser"];
const defaultRole = "student";

const userSchema = mongoose.Schema(
  {
    username: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: defaultRole,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

exports.User = mongoose.model("User", userSchema);
exports.USER_ROLES = USER_ROLES;
