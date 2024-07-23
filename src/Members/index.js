const express = require("express");
const router = express.Router();
const {
  creatememberaccount,
  fetchmembers,
  getPoints,
  deletememberaccount,
  updatememberaccount,
} = require("./reqres");
const { checkToken } = require("../../Libs/JWTtoken");

const routes = () => {
  router.post("/creatememberaccount", checkToken, creatememberaccount);
  router.put("/updatememberaccount", checkToken, updatememberaccount);
  router.delete("/deletememberaccount", checkToken, deletememberaccount);
  router.get("/getmembers", checkToken, fetchmembers);

  return router;
};

module.exports = routes;
