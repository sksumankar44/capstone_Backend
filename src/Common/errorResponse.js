const errorResponses = {
  SUCCESS: {
    code: 200,
    message: "SUCCESS",
  },
  INVALID_TOKEN: {
    code: 401,
    message: "Invalid token provided.",
  },
  TOKEN_EXPIRED: {
    code: 401,
    message: "Token has expired.",
  },
  MEMBER_NOT_FOUND: {
    code: 404,
    message: "Member not found.",
  },
  MEMBER_ALREADY_EXISTS: {
    code: 409,
    message: "Member already exists.",
  },
  DATABASE_CONNECTION_ERROR: {
    code: 500,
    message: "Error connecting to the database.",
  },
  DATA_FETCH_ERROR: {
    code: 500,
    message: "Error fetching data from the database.",
  },
  DATA_INSERT_ERROR: {
    code: 500,
    message: "Error inserting data into the database.",
  },
  DATA_UPDATE_ERROR: {
    code: 500,
    message: "Error updating data in the database.",
  },
  DATA_DELETE_ERROR: {
    code: 500,
    message: "Error deleting data from the database.",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "Internal server error.",
  },
  UNAUTHORIZED_ACCESS: {
    code: 403,
    message: "Unauthorized access.",
  },
  BAD_REQUEST: {
    code: 400,
    message: "Bad request.",
  },
  NOT_FOUND: {
    code: 404,
    message: "Requested resource not found.",
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    message: "Service unavailable. Please try again later.",
  },
};

module.exports = errorResponses;
