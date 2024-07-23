const express = require("express");
const router = express.Router();
const { updatepoints } = require("./regres");
const { checkToken } = require("../Libs/JWTtoken");

const routes = () => {
  router.post("/updatepoints", checkToken, updatepoints);
  return router;
};

module.exports = routes;
