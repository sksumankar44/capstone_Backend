const supabase = require("../../Libs/DBConnection");
const { encryptedObj } = require("../../en-dec-data");

const newaccount = async (dataJson) => {
  let response = {};
  try {
    // Check if the user already exists
    console.log("Checking if user already exists with email:", dataJson.email);
    let { data: userData, error: userError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", dataJson.email);

    if (userError) {
      throw userError;
    }

    console.log("User data retrieved:", userData);

    if (userData.length === 0) {
      // Encrypt the password
      let encpassword = encryptedObj(dataJson.password);

      console.log("Encrypted password:", encpassword);

      // Insert new user
      let { data: insertUserData, error: insertUserError } = await supabase
        .from("admin_users")
        .insert([
          { email: dataJson.email, password: encpassword, name: dataJson.name },
        ]);

      if (insertUserError) {
        throw insertUserError;
      }

      // console.log("User inserted:", insertUserData);

      response.status = 200;
      response.message = "Account created successfully";
      response.data = insertUserData;
    } else {
      response.status = 400;
      response.message = "Email already exists in users";
    }
  } catch (error) {
    response.status = 500;
    response.message = "Internal error";
    console.error("Error creating account:", error);
  }

  return response;
};

//

const deleteaccount = async (email) => {
  let response = {};
  try {
    // Check if the user exists
    let { data: userData, error: userError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email);

    if (userError) {
      throw userError;
    }

    if (userData.length === 0) {
      response.status = 400;
      response.message = "Email does not exist in admin users";
    } else {
      // Delete the user
      let { data: deleteData, error: deleteError } = await supabase
        .from("admin_users")
        .delete()
        .eq("email", email);

      if (deleteError) {
        throw deleteError;
      }

      response.status = 200;
      response.message = "Admin account deleted successfully";
      response.data = deleteData;
    }
  } catch (error) {
    response.status = 500;
    response.message = "Internal error";
    console.error("Error deleting account:", error);
  }

  return response;
};

module.exports = {
  newaccount,
  deleteaccount,
};
