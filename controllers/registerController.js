// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: (data) => {
//     usersDB.users = data;
//   },
// };
// const fs = require("fs").promises;
// const path = require("path");
const User = require('../model/User');
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res
      .status(400)
      .json({ Message: "username and password are required." });
  // Check duplicate in MongoDB
  const duplicate = await User.findOne({username: user}).exec();
  console.log(duplicate)
  // check for duplicate usernames in DB JSON.
  // const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate)
    return res.status(409).json({ Message: `User ${user} is Found in DB.` });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser =await User.create({
      username: user,
      password: hashedPassword
    });
    console.log(newUser);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = handleNewUser;