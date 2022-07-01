const User = require("../model/User");
const jwt = require("jsonwebtoken");

const refreshTokenHandler = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const JWTToken = cookies.jwt;
  const foundUser = await User.findOne({refreshToken: JWTToken}).exec();
  console.log(foundUser)
  jwt.verify(JWTToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = refreshTokenHandler;
