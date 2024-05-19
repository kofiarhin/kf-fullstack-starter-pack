const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  return res.json({ message: "get users" });
});
module.exports = router;
