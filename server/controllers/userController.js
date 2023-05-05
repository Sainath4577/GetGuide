const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const olduser = await User.findOne({ email });
  if (olduser) {
    res.status(401).json({ message: "User already exists !!!" });
  } else {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    if (user) {
      let token = genToken(user._id);
      const userToken = _.omit(user.toObject(), "password");
      res.status(200).json({ userToken, token });
    } else {
      console.log(error);
      res.status(401);
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(401).json({ message: "User not found !!!" });
  } else {
    if (await bcrypt.compare(password, userExists.password)) {
      let token = genToken(userExists._id);
      const userToken = _.omit(userExists.toObject(), "password");
      res.status(200).json({ userToken, token });
    } else {
      res.status(401).json({ message: "Invalid password !!!" });
    }
  }
};
const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

const updateUser = async (req, res) => {
  try {
    const userDetails = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: req.body },
      { new: true }
    ).select("-password");
    res.status(200).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const gotUser = await User.findOne({ _id: id }).select("-password");
    if (gotUser) res.status(200).json(gotUser);
  } catch (error) {
    res.status(404).json({ message: "User not found !!!" });
  }
};

const followUser = async (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() === id) {
    return res.status(200).json({ message: "Can't follow self !!!" });
  }
  try {
    const gotUser = await User.findOne({ _id: req.user._id });
    if (!gotUser.following.includes(id)) {
      await gotUser.updateOne({ $push: { following: id } });
      const followingUser = await User.findOne({ id });
      await followingUser.updateOne({ $push: { follower: req.user._id } });
      return res
        .status(200)
        .json({ message: `Following ${followingUser.name} !!!` });
    } else {
      await gotUser.updateOne({ $pull: { following: id } });
      const followingUser = await User.findOne({ id });
      await followingUser.updateOne({ $pull: { follower: req.user._id } });
      return res
        .status(200)
        .json({ message: `Unfollowing ${followingUser.name} !!!` });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

// const getFollowers = async (req, res) => {
//   try {
//     let follersData;
//     const gotFollersD = await User.findById(req.user._id);
//     if(gotFollersD)
//     {
//       gotFollersD.follower.forEach(element => {
//         let fdata=  User.findById(element);

//       });
//     }
//   } catch (error) {
//     res.status(404).json({message:"Something went wrong !!!"})
//   }
// };
// const getFollowerings = async (req, res) => {};
module.exports = {
  register,
  login,
  getUser,
  followUser,
  updateUser,
};
