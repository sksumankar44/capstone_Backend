const DAL = require("./dbquery");
const { responseStatement } = require("../Common/common");
// const fs = require("fs");

const validatecreds = async (req, res) => {
  try {
    const email = req.body.email ? req.body.email.trim() : null;
    const password = req.body.password ? req.body.password.trim() : null;

    if (!email || !password) {
      responseStatement(res, 500, "Please enter your details");
      console.error("The details are blank");
      return; // Exit the function early if details are blank
    }

    const dataJson = { email, password };
    console.log("Login data:", dataJson);

    const response = await DAL.fetchCreds(dataJson);
    console.log("Status:", response.status);

    if (response.status === 200) {
      res.status(200).cookie("token", response.token).send(response);
    } else {
      responseStatement(res, 400, response.message);
    }
  } catch (error) {
    console.error("Error validating credentials:", error);
    responseStatement(res, 500, "Internal Server Error.");
  }
};

module.exports = { validatecreds };
