const success = (statusCode, result) => {
  return {
    status: "OK",
    statusCode,
    result,
  };
};
const error = (statusCode, errordetails) => {
  return {
    status: "ERROR",
    statusCode,
    errordetails,
  };
};
module.exports = {
  success,
  error,
};
