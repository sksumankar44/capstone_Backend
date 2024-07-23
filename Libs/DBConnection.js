const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL and KEY must be provided");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    const { data, error } = await supabase.from("admin_users").select("*");
    if (error) {
      console.error("Error testing connection:", error);
    } else {
      console.log("Connected to Supabase");
    }
  } catch (error) {
    console.log(error);
  }
}
testConnection();

module.exports = supabase;
