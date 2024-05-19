const { Router } = require("express");
const { generateToken } = require("../utils/helper");
const {
  registerUser,
  logoutUser,
  getProfile,
  loginUser,
} = require("../controllers/authController");
const { auth } = require("../middleware/auth");
const router = Router();

router.post("/login", loginUser);
router.get("/profile", auth, getProfile);
router.get("/logout", logoutUser);
router.post("/register", registerUser);

module.exports = router;
