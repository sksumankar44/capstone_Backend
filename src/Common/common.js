// const {encryptedObj} = require('../../en-dec-data')

async function responseStatement(res, statusCode, responsePayload) {
  res.setHeader("Content-Type", "application/json");

  console.log(responsePayload);
  res.status(statusCode).json({ response: responsePayload });
}

module.exports = { responseStatement };
