const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.exp < Date.now() / 1000) {
        return res.status(303).json({ message: "Token expired !!!" });
      }

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Unauthorized !!!" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized !!!" });
  }
};

module.exports = protect;
