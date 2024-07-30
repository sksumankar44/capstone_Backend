const express = require("express");
const router = express.Router();
const loginRouter = require("./login/index");
const registerRouter = require("./register/index");
const memberrouter = require("./Members/index");
const pointsrouter = require("../Transaction/index");
const { logout } = require("./logout");
const transactionRouter = require("./transactionRoutes");
// const adminRouter = require("./register/index");
const routes = () => {
  router.use(function (req, res, next) {
    console.log("URL:", req.originalUrl);
    console.log("HEADERS ===== ", req.headers);
    console.log("PARAMS ===== ", req.query);
    console.log("BODY ===== ", req.body);
    next();
  });

  router.use("/login", loginRouter());
  router.post("/logout", logout);
  router.use("/register", registerRouter());
  router.use("/member", memberrouter());
  router.use("/points", pointsrouter());
  router.use("/transactions", transactionRouter);

  //router.use("/admin", adminRouter());
  return router;
};

module.exports = routes;
