const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

// protected routes token base
const requireSignIn = async (req, res, next) => {
  try {
    console.log("Authorization Header:", req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Extracted Token:", token);
    if (!token) {
      return res
        .status(401)
        .send({ success: false, message: "No token provided" });
    }
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log("JWT Error:", error);
    return res.status(401).send({ success: false, message: "Invalid token" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};

module.exports = { requireSignIn, isAdmin };
