const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(400);
      throw new Error("Not authorized");
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    if (!id) {
      res.status(400);
      throw new Error("invalid token");
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(400);
      throw new Error("user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auth,
};
