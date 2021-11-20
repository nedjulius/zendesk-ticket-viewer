/* eslint-disable no-unused-vars */
module.exports = (err, req, res, next) => {
  res.status(500).json({error: err.message});
};
