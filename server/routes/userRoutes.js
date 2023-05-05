const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  register,
  login,
  getUser,
  updateUser,
  followUser,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/:id", protect, getUser);
router.patch("/", protect, updateUser);
router.patch("/follow/:id", protect, followUser);

module.exports = router;
