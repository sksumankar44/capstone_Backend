const { response } = require("express");
const supabase = require("../Libs/DBConnection");
const { responseStatement } = require("../src/Common/common");

const points = async (dataJson) => {
  console.log("6th line The data: " + JSON.stringify(dataJson));
  let response = {};
  try {
    let { data: userData, error: userError } = await supabase
      .from("members")
      .select("points")
      .eq("email", dataJson.member);
    console.log("User Data: ", userData);

    if (userError) {
      throw userError;
    }

    if (userData.length !== 0) {
      const currentPoints = parseInt(userData[0].points);
      console.log("Current Points: ", currentPoints);
      const isSuccess = await updatePoints(currentPoints, dataJson);

      if (isSuccess === true) {
        response.status = 200;
        response.message = "Transaction successful";
      } else {
        console.log(isSuccess.message);
        response.status = 400;
        response.message = isSuccess.message;
      }
    } else {
      response.status = 400;
      response.message = "Member not found";
    }
  } catch (error) {
    response.status = 500;
    response.message = "Internal error";
    console.error(error);
  }

  return response;
};

const updatePoints = async (currentPoints, dataJson) => {
  const { points, member, type } = dataJson;
  const pointsToAdjust = parseInt(points);
  console.log("Points to Adjust: ", pointsToAdjust);

  if (isNaN(pointsToAdjust)) {
    console.error("Invalid points to adjust:", points);
    return { status: false, message: "Invalid points to adjust" };
  }

  const newPoints =
    type === "credit"
      ? currentPoints + pointsToAdjust
      : currentPoints - pointsToAdjust;

  console.log("New Points: ", newPoints);
  // Check if new points are negative
  if (newPoints < 0) {
    console.error("New points cannot be negative");
    return {
      status: false,
      message:
        "Points cannot be debited as it would result in a negative balance",
    };
  }

  console.log("New Points: ", newPoints);
  try {
    let { data: updatedUserData, error: updateError } = await supabase
      .from("members")
      .update({ points: newPoints })
      .eq("email", member);

    if (updateError) {
      console.error("Error while updating the points: ", updateError);
      return { status: false, message: "Error updating the points" };
    }

    console.log("Updated User Data: ", updatedUserData);

    const isTransactionLogged = await transactionHistory(dataJson);
    if (isTransactionLogged.status) {
      return true;
    } else {
      console.log("The transaction is not recorded");
      return { status: false, message: isTransactionLogged.message };
    }
  } catch (err) {
    console.error("Unexpected error: ", err);
    return { status: false, message: "Internal error while updating points" };
  }
};

const transactionHistory = async (dataJson) => {
  const { member, type, points, admin, description } = dataJson;

  try {
    let { data, error } = await supabase.from("transactions").insert([
      {
        member: member,
        type: type,
        points: parseInt(points),
        admin: admin,
        description: description,
      },
    ]);

    if (error) {
      console.error("Error while recording the transaction: ", error);
      return {
        status: false,
        message:
          "Unable to update the transaction history make a refund request",
      };
    }

    return {
      status: true,
      message: "Transaction history updated successfully",
    };
  } catch (err) {
    console.error("Unexpected error: ", err);
    return {
      status: false,
      message: "Internal error while recording transaction ",
    };
  }
};

const gettransactions = async (req, res) => {
  console.log("Its entering");
  try {
    let { data: memberData, error: memberError } = await supabase
      .from("transactions")
      .select("*");

    if (memberError) {
      throw memberError;
    }

    if (memberData.length === 0) {
      return responseStatement(res, 200, "No transactions");
    }
    return responseStatement(res, 200, memberData);
  } catch (error) {
    console.error("Error fetching members", error);
    return responseStatement(res, 500, "Internal Server Error.");
  }
};
module.exports = { points, gettransactions };

// module.exports = { points };
