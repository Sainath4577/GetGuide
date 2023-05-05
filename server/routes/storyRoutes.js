const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getStories,
  createStory,
  updateStory,
  deleteStory,
  likeStory,
  getStory,
  getUserStories,
} = require("../controllers/storyController");

router.get("/", protect, getStories);
router.get("/:id", protect, getStory);
router.get("/all/:id", protect, getUserStories);
router.post("/", protect, createStory);
router.patch("/:id", protect, updateStory);
router.delete("/:id", protect, deleteStory);
router.patch("/:id/like", protect, likeStory);

module.exports = router;
