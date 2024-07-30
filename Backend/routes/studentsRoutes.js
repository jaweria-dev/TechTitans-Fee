const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const formidable = require("express-formidable");
const { createStudentController } = require("../controllers/studentController");

// router object
const router = express.Router();

// routes
router.post(
  "/create-student",
  requireSignIn,
  isAdmin,
  formidable(),
  createStudentController
);

module.exports = router;
