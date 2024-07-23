const express = require("express");
const router = express.Router();
const {
  createadminaccount,
  getadminaccounts,
  deleteadminaccount,
} = require("./reqres");
const { checkToken } = require("../../Libs/JWTtoken");

const routes = () => {
  router.post("/createadminaccount", createadminaccount);
  router.get("/getadminaccounts", getadminaccounts);
  // router.post("/creatememberaccount", checkToken, creatememberaccount);
  router.delete("/deleteadminaccount", deleteadminaccount);
  return router;
};

module.exports = routes;
