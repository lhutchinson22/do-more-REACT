require("dotenv").config();
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
          .json({ msg: "not all fields have been entered." });
      }

      if (passwordCheck.length < 8) {
        return res.status(400).json({ msg: "password must be longer." });
      }

      if (password !== passwordCheck) {
        return res.status(400).json({ msg: "passwords do not match." });
      }

      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return res.status(400).json({ msg: "user already exists." });
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

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // validation
      if (!email || !password)
        return res
          .status(400)
          .json({ msg: "not all fields have been entered." });

      const user = await User.findOne({ email: email });

      if (!user)
        return res
          .status(400)
          .json({ msg: "no account with this email has been registered." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "invalid credentials." });

      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
        expiresIn: "24h",
      });

      res.json({
        token,
        user: {
          id: user._id,
          displayName: user.displayName,
          confirmed: user.confirmed,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
