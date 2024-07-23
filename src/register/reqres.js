const DAL = require("./dbquery");
const supabase = require("../../Libs/DBConnection");
const { responseStatement } = require("../Common/common");

// const fs = require("fs");

const createadminaccount = async (req, res) => {
  try {
    let name = req.body.name || "";
    let email = req.body.email || "";
    let password = req.body.password || "";

    if (name.trim() === "" || password.trim() === "" || email.trim() === "") {
      responseStatement(res, 400, "Please enter your details");
      console.error("The details are blank");
      return;
    }

    const dataJson = { name, password, email };
    console.log("admin Registered data:", dataJson);

    const response = await DAL.newaccount(dataJson);
    console.log("Status:", response.status);

    if (response.status === 200) {
      // const log = `Name:${name} email:${email} Account created on :${Date()}\n`;
      // fs.appendFile("AdminSignup.txt", log, (err, data) => {});

      responseStatement(res, 200, response);
    } else {
      responseStatement(res, 400, response);
    }
  } catch (error) {
    responseStatement(res, 500, "Internal Server Error.");
  }
};

const getadminaccounts = async (req, res) => {
  try {
    const pageSize = 10;
    let { data: userData, error: userError } = await supabase
      .from("admin_users")
      .select("name, email")
      .limit(pageSize);

    if (userError) {
      throw userError;
    }

    if (userData.length === 0) {
      return responseStatement(res, 200, "No Users.");
    }

    return responseStatement(res, 200, userData);
  } catch (error) {
    console.error("Error while fetching members", error);
    return responseStatement(res, 500, "Internal Server Error.");
  }
};

const deleteadminaccount = async (req, res) => {
  try {
    let email = req.body.email.trim();
    const response = await DAL.deleteaccount(email);
    return responseStatement(res, response.status, response.message);
  } catch (error) {
    console.error("Error deleting admin account:", error);
    return responseStatement(res, 500, "INTERNAL_SERVER_ERROR");
  }
};
module.exports = { createadminaccount, getadminaccounts, deleteadminaccount };
