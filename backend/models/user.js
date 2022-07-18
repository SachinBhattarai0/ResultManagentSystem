const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const TEACHER = "teacher";
const STUDENT = "student";
const SCHOOL_ADMIN = "schoolAdmin";
const SUPERUSER = "superUser";

const USER_ROLES = [TEACHER, STUDENT, SCHOOL_ADMIN, SUPERUSER];
const DEFAULT_ROLE = "student";

const userSchema = mongoose.Schema(
  {
    username: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: DEFAULT_ROLE,
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
exports.DEFAULT_ROLE = DEFAULT_ROLE;
exports.TEACHER = TEACHER;
exports.STUDENT = STUDENT;
exports.SCHOOL_ADMIN = SCHOOL_ADMIN;
exports.SUPERUSER = SUPERUSER;
