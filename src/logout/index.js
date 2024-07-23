const logout = (req, res) => {
  res.clearCookie("token").status(200).send("Logout successful");
};

module.exports = { logout };
