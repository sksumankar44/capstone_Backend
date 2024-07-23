const supabase = require("../../Libs/DBConnection");

const newaccount = async (dataJson) => {
  let response = {};
  try {
    let { data: memberData, error: memberError } = await supabase
      .from("members")
      .select("*")
      .eq("email", dataJson.email);

    if (memberError) {
      return "DATA_FETCH_ERROR";
    }

    if (memberData.length === 0) {
      let { data, error: insertMemberError } = await supabase
        .from("members")
        .insert([
          {
            email: dataJson.email,
            createdby: dataJson.createdby,
            member_name: dataJson.member_name,
          },
        ]);
      if (insertMemberError) {
        response.code = 500;
        response.status = "Error connecting to the database.";
      } else {
        response.code = 200;
        response.status = "SUCCESS";
      }
    } else {
      response.code = 409;
      response.status = "MEMBER_ALREADY_EXISTS";
    }
  } catch (error) {
    response.code = 500;
    response.status = "INTERNAL_SERVER_ERROR";
  }
  return response;
};

const deleteaccount = async (email) => {
  let response = {};
  try {
    let { data, error: deleteError } = await supabase
      .from("members")
      .delete()
      .eq("email", email);
    if (deleteError) {
      response.code = 500;
      response.status = "Error While deleting error.";
    } else {
      response.code = 200;
      response.status = "SUCCESS";
    }
  } catch (error) {
    response.code = 500;
    response.status = "INTERNAL_SERVER_ERROR";
  }
  return response;
};

const updateaccount = async (currentEmail, newEmail, newName) => {
  let response = {};

  try {
    let updateData = {};

    if (newName !== null && newName !== "") {
      updateData.member_name = newName;
    }
    if (newEmail !== null && newEmail !== "") {
      let { data: existingMember, error: fetchError } = await supabase
        .from("members")
        .select("*")
        .eq("email", newEmail);

      if (fetchError) {
        response.code = 500;
        response.status = "Error connecting to the database.";
        return response;
      }

      if (existingMember.length > 0) {
        response.code = 409; // Conflict status code
        response.status = "Member with this email already exists.";
        return response;
      }

      updateData.email = newEmail;
    }

    // Perform the update if there are fields to update
    if (Object.keys(updateData).length > 0) {
      let { data: updateResult, error: updateError } = await supabase
        .from("members")
        .update(updateData)
        .eq("email", currentEmail);

      if (updateError) {
        response.code = 500;
        response.status = "Error updating member.";
      } else {
        response.code = 200;
        response.status = "SUCCESS";
      }
    } else {
      response.code = 400; // Bad request status code
      response.status = "Nothing to update.";
    }
  } catch (error) {
    console.error("Error updating member:", error.message);
    response.code = 500;
    response.status = "INTERNAL_SERVER_ERROR";
  }

  return response;
};

module.exports = {
  newaccount,
  deleteaccount,
  updateaccount,
};
