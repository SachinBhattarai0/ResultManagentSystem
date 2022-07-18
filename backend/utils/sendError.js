module.exports = sendError = (res, error, code = 400) => {
  if (error.code === 11000)
    error = "Possible duplication of the values which should be unique";
  res.status(code).json({ error });
};
