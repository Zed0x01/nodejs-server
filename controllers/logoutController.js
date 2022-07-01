const User = require('../model/User');


const logoutHandler = async (req, res) => {

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(201);
  const JWTToken = cookies.jwt;
  const foundUser = await User.findOne({refreshToken: JWTToken}).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
    res.sendStatus(403);
  }
  foundUser.refreshToken = '';
  await foundUser.save();
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
  res.sendStatus(200);
};

module.exports = logoutHandler;
