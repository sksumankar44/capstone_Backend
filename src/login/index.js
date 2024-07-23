const express = require("express");
const router = express.Router();
const { validatecreds } = require("./reqres");

const routes = () => {
  router.post("/validate", validatecreds);

  return router;
};

module.exports = routes;
