const DAL = require("./dbquery");
const { responseStatement } = require("../Common/common.js");
// const { responseStatement } = require("../Common/common.js");
// const { errorResponses } = require("../Common/errorResponse");
const supabase = require("../../Libs/DBConnection");

const creatememberaccount = async (req, res) => {
  try {
    let email = req.body.email.trim();
    let member_name = req.body.member_name.trim();
    let createdby = req.email;

    const dataJson = { createdby, email, member_name };

    const response = await DAL.newaccount(dataJson);

    return responseStatement(res, response.code, response.status);
  } catch (error) {
    console.error("Error in member account creation:", error);
    return responseStatement(res, 500, "INTERNAL_SERVER_ERROR");
  }
};

const deletememberaccount = async (req, res) => {
  try {
    let email = req.body.email.trim();
    console.log(email);
    const response = await DAL.deleteaccount(email);
    return responseStatement(res, response.code, response.status);
  } catch (error) {
    return responseStatement(res, 500, "INTERNAL_SERVER_ERROR");
  }
};

const updatememberaccount = async (req, res) => {
  try {
    const response = await DAL.updateaccount(
      req.body.currentEmail,
      req.body.newEmail,
      req.body.newName
    );
    return responseStatement(res, response.code, response.status);
  } catch (error) {
    return responseStatement(res, 500, "INTERNAL_SERVER_ERROR");
  }
};

const fetchmembers = async (req, res) => {
  try {
    let { data: memberData, error: memberError } = await supabase
      .from("members")
      .select("member_name, email,points");

    if (memberError) {
      throw memberError;
    }

    if (memberData.length === 0) {
      return responseStatement(res, 200, "No members.");
    }
    return responseStatement(res, 200, memberData);
  } catch (error) {
    console.error("Error fetching members", error);
    return responseStatement(res, 500, "Internal Server Error.");
  }
};

const getPoints = async (req, res) => {
  try {
    const { email } = req.query;
    console.log("fetching points of email:" + email);

    if (!email) {
      return responseStatement(res, 400, "Email parameter is required");
    }

    let { data: memberData, error: memberError } = await supabase
      .from("members")
      .select("email, points")
      .eq("email", email);

    console.log("length of data :- " + memberData.length);
    console.log("data from db of points :- " + memberData[0]);
    if (memberError) {
      throw memberError;
    }

    if (memberData.length === 0) {
      return responseStatement(
        res,
        404,
        "No member found with the provided email"
      );
    }

    res.status(200).json(memberData[0]);
  } catch (error) {
    console.error("Error fetching member data:", error);
    responseStatement(res, 500, "Internal Server Error.");
  }
};
module.exports = {
  creatememberaccount,
  fetchmembers,
  getPoints,
  deletememberaccount,
  updatememberaccount,
};
