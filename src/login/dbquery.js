const supabase = require("../../Libs/DBConnection");
const { getJWTTokenVal } = require("../../Libs/JWTtoken");
const { decryptedObj, encryptedObj } = require("../../en-dec-data");

const fetchCreds = async (dataJson) => {
  let response = {};
  try {
    let { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", dataJson.email);
    console.log("jhasvjbdjhsbcjhsb", data);
    if (error) {
      throw error;
    }

    if (
      data.length === 0 ||
      dataJson.password !== decryptedObj({ decode: data[0].password })
    ) {
      response.status = 400;
      response.message = "Invalid credentials";
      return response;
    }

    const token = await getJWTTokenVal({ email: dataJson.email });

    response.status = 200;
    response.message = "Login successful";
    response.userData = data[0].name;
    response.token = token;

    console.log("login resposne", response);
  } catch (error) {
    response.status = 500;
    response.message = "Internal error";
    console.error(error);
  }

  return response;
};

module.exports = {
  fetchCreds,
};
