const Mark = require("../models/marks");
const fs = require("fs");
const hbs = require("handlebars");
const pdf = require("html-pdf");
const sendError = require("../utils/sendError");

// exports.getStudentMarksheet = async (req, res) => {
//   const { studentId, examId } = req.body;
//   if (!studentId || !examId)
//     return sendError(res, "StudentId and ExamId are required");

//   const data = await Mark.findOne({ user: studentId, exam: examId })
//     .select("user marks className")
//     .populate("user className")
//     .lean();
//   console.log(data);

//   const compiledHTML = compile("defaultTemplate", data);

//   pdf.create(compiledHTML, { footer: "Letter" }).toStream((err, stream) => {
//     if (err) return sendError(res, "pdf creation failed");
//     stream.pipe(res);
//   });
// };

// const compile = (fileName, data) => {
//   const html = fs.readFileSync(
//     `${__dirname}/templates/${fileName}.hbs`,
//     "utf-8"
//   );
//   return hbs.compile(html)(data);
// };

exports.getStudentMarksheet = async (req, res) => {};

exports.getClassMarksheet = (req, res) => {
  console.log("student mark");
};
