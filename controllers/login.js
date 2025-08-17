const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userLogin = require("../models/loginSchema");

// Fixed credentials
const USER_EMAIL = "user@gmail.com";
const USER_PASSWORD = "Userss@123";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    } 

    // Password must have at least 1 number, 1 special char (@ or #), min length 8
    const passwordRegex = /^(?=.*[0-9])(?=.*[@#])[A-Za-z0-9@#]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        msg: "Password must be at least 8 characters long and contain at least one number and one special character (@ or #)",
      });
    }

    // Allow only fixed user credentials
    if (email !== USER_EMAIL || password !== USER_PASSWORD) {
      return res.status(401).json({
        success: false,
        msg: "Invalid email or password",
      });
    }

    // Check if user exists in DB, if not then create
    let user = await userLogin.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10); // Store hashed password
      user = new userLogin({
        email,
        password: hashedPassword,
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: "user" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      msg: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};
