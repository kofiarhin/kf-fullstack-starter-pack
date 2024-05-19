const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  return res.json({ error: error.message });
};

module.exports = {
  errorHandler,
};
