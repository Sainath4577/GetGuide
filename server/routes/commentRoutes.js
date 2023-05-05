const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  commentStory,
  getComment,
  deleteComment,
} = require("../controllers/commentController");

router.post("/:id", protect, commentStory);
router.get("/:id", protect, getComment);
router.delete("/:id", protect, deleteComment);
module.exports = router;
