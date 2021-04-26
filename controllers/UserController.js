const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, passwordCheck, displayName } = req.body;

      if (!email || !password || !passwordCheck || !displayName) {
        return res
          .status(400)
          .json({ msg: "not all fields have beeb entered" });
      }

      if (passwordCheck.length < 8) {
        return res.status(400).json({ msg: "password must be longer" });
      }

      if (password !== passwordCheck) {
        return res.status(400).json({ msg: "passwords do not match" });
      }

      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return res.status(400).json({ msg: "user already exists" });
      }

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        password: passwordHash,
        displayName,
      });

      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  },
};
