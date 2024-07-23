const { responseStatement } = require("../src/Common/common");
const DAL = require("./dbquery");

const updatepoints = async (req, res) => {
  try {
    let member = req.body.member || "";
    let admin = req.body.admin;
    let points = parseInt(req.body.points) || "";
    let description = req.body.description || "";
    let type = req.body.type || "";

    if (
      member.trim() === "" ||
      type.trim() === "" ||
      points === "" ||
      description === ""
    ) {
      res.status(400).send("Please enter your details");
      console.error("The details are blank");
      return;
    }
    const dataJson = { points, description, admin, member, type };
    console.log("The trancation details:", dataJson);

    const response = await DAL.points(dataJson, res);
    console.log("Status:", response.status);

    if (response.status === 200) {
      responseStatement(res, 200, response);
    } else {
      responseStatement(res, 400, response);
    }
  } catch (error) {
    console.error("Error signup", error);
    responseStatement(res, 500, "Internal Server Error.");
  }
};

module.exports = { updatepoints };
