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
  getStudentDataByTeacherId,
  searchStudentController,
  relatedStudentController,
  getStudentsByTeacherController,
  studentCountController,
  studentListController,
  studentFiltersController,
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

//delete student
router.delete("/delete-student/:sid", deleteStudentController);

// get student by teacher filter
router.get("/get-student-data/:teacherId", getStudentDataByTeacherId);

//student count
router.get("/student-count", studentCountController);

//student per page
router.get("/student-list/:page", studentListController);

// search student
router.get("/search-student/:keyword", searchStudentController);

// simmilar student
router.get("/related-students/:sid/:tid", relatedStudentController);

// teacher wise student
router.get("/students-teacher/:slug", getStudentsByTeacherController);

//filter product
router.post("/student-filters", studentFiltersController);

module.exports = router;
