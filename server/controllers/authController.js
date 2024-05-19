const User = require("../model/userModel");
const { generateToken } = require("../utils/helper");
const bcrypt = require("bcryptjs");

// logout user
const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  return res.json({ message: "you have been logged out" });
};

// get profile
const getProfile = (req, res, next) => {
  try {
    return res.json(req.user);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("user not found");
    }

    // compare password
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      res.status(400);
      throw new Error("invalid credentials");
    }
    const token = generateToken(user._id);
    res.cookie("jwt", token);
    const { password: newPassword, ...rest } = user._doc;
    return res.json({ ...rest });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // validate fields
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("please fill out all fields");
    }

    // check if user is already registered
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      res.status(400);
      throw new Error("email already taken");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    // const { password: userPassword, ...rest } = user._doc;
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  logoutUser,
  getProfile,
  loginUser,
};
