require("dotenv").config();
const express = require("express");
const supabase = require("./Libs/DBConnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./src/Routes");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes());
// Disable SSL certificate validation workaround
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const port = process.env.API_PORT;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
