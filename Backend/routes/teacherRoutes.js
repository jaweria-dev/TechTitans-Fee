const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const { createTeacherController, updateTeacherController, teacherController, singleTeacherController, deleteTeacherController } = require("../controllers/teacherController");


// router object
const router = express.Router();

// routes
// create category
router.post(
  "/create-teacher",
  requireSignIn,
  isAdmin,
  createTeacherController
);

// update category
router.put(
  "/update-teacher/:id",
  requireSignIn,
  isAdmin,
  updateTeacherController
);

// get All category
router.get("/get-teacher", teacherController);

// Single category
router.get("/single-teacher/:slug", singleTeacherController);

// Delete category
router.delete(
  "/delete-teacher/:id",
  requireSignIn,
  isAdmin,
  deleteTeacherController
);

module.exports = router;
