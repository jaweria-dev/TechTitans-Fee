const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const formidable = require("express-formidable");
const {
  createStudentController,
  getStudentController,
  getSingleStudentController,
  studentPhotoController,
  updateStudentController,
  deleteStudentController,
} = require("../controllers/studentController");

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

// update student
router.put(
  "/update-student/:sid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateStudentController
);

//get students
router.get("/get-student", getStudentController);

//get single student
router.get("/get-student/:slug", getSingleStudentController);

//get photo
router.get("/student-photo/:sid", studentPhotoController);

//delete rproduct
router.delete("/delete-student/:sid", deleteStudentController);

module.exports = router;
