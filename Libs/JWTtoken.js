require("dotenv").config();
const jwt = require("jsonwebtoken");
const { responseStatement } = require("../src/Common/common");

const getJWTTokenVal = async (Data) => {
  console.log(Data);
  try {
    const data = {
      email: Data.email,
    };
    const expiresIn = "30m";
    const jwttoken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn });
    return jwttoken;
  } catch (err) {
    console.error(err);
  }
};

const checkToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return responseStatement(res, 401, "Access denied. token is missing");
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.email = data.email;
    console.log("login user:" + req.email);
    next();
  } catch (error) {
    console.log({ error: error.message });
    return res.status(401).send("Invalid token");
  }
};

module.exports = {
  getJWTTokenVal,
  checkToken,
};
