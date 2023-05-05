const Story = require("../models/storyModel");

const getStories = async (req, res) => {
  try {
    const allStories = await Story.find({});
    if (allStories) res.status(200).json(allStories);
  } catch (error) {
    res.status(404).json({ message: "No stories found !!!" });
  }
};

const createStory = async (req, res) => {
  const newStory = new Story({
    ...req.body,
    userId: req.user._id,
  });
  try {
    const newStoryCreated = await newStory.save();
    res.status(200).json({ message: "Story created successfully !!!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong !!!" });
  }
};
const updateStory = async (req, res) => {
  const { id } = req.params;
  const storyDetails = await Story.findOne({ _id: id });

  if (storyDetails.userId.toString() === req.user._id.toString()) {
    try {
      const updateStoryDone = await Story.findOneAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateStoryDone);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Something went wrong !!!" });
    }
  } else return res.status(401).json({ message: "Unauthorized to edit !!!" });
};

const deleteStory = async (req, res) => {
  const { id } = req.params;
  const storyDetails = await Story.find({ _id: id });

  try {
    await Story.deleteOne({ _id: id });
    return res.status(200).json({ message: "Story deleted !!!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
const likeStory = async (req, res) => {
  const { id } = req.params;
  try {
    const storyDetails = await Story.findOne({ _id: id });
    if (!storyDetails.likes.includes(req.user._id)) {
      await storyDetails.updateOne({ $push: { likes: req.user._id } });
      return res.status(200).json("Story has been liked !!!");
    } else {
      await storyDetails.updateOne({ $pull: { likes: req.user._id } });
      return res.status(200).json("Story has been disliked !!!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong !!!" });
  }
};

const getStory = async (req, res) => {
  const { id } = req.params;
  try {
    const gotStory = await Story.findOne({ _id: id });
    res.status(200).json(gotStory);
  } catch (error) {
    res.status(404).json({ message: "No such story found !!!" });
  }
};
const getUserStories = async (req, res) => {
  const { id } = req.params;
  try {
    const gotStories = await Story.find({ userId: id });
    res.status(200).json(gotStories);
  } catch (error) {
    res.status(404).json({ message: "No stories found !!!" });
  }
};

module.exports = {
  getStories,
  createStory,
  updateStory,
  deleteStory,
  likeStory,
  getStory,
  getUserStories,
};
