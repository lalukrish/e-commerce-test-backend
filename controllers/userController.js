const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const { generateToken } = require("../middleware/authMiddileware");

const userController = {
  createUser: async (req, res) => {
    const { username, email, password, role, address, pincode, phone } =
      req.body;
    try {
      const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email or phone number already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        email,
        password: hashedPassword,
        // role,
        // address,
        // pincode,
        phone,
      });

      await user.save();
      res
        .status(201)
        .json({ message: "User created successfully", user: user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
      console.log(error);
    }
  },

  userLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user);
      res.json({
        message: "Successfully logged in",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          address: user.address,
          pincode: user.pincode,
          phone: user.phone,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

module.exports = userController;
