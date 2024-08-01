const slugify = require("slugify");
const teacherModel = require("../models/teacherModel");

const createTeacherController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingteacher = await teacherModel.findOne({ name });
    if (existingteacher) {
      return res.status(200).send({
        success: true,
        message: "Teacher Already Exists",
      });
    }
    const teacher = await new teacherModel({
      name,
      slug: slugify(name),
    }).save();
    return res.status(201).send({
      success: true,
      message: "new teacher created",
      teacher,
    });
  } catch (error) {
    console.log(error);
    if (!res.headersSent) {
      return res.status(500).send({
        success: false,
        error,
        message: "Error in teacher name",
      });
    }
  }
};

// update category controller
const updateTeacherController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const teacher = await teacherModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Teacher Updated Successfuly",
      teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Updating teacher name",
    });
  }
};

// get all teacher
const teacherController = async (req, res) => {
  try {
    const teacher = await teacherModel.find({});
    res.status(200).send({
      success: true,
      message: "ALL teacher List",
      teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all teacher",
    });
  }
};

// Single category controller
const singleTeacherController = async (req, res) => {
  try {
    const teacher = await teacherModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single Teacher Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all teacher",
    });
  }
};

//   Delete category controller
const deleteTeacherController = async (req, res) => {
  try {
    const { id } = req.params;
    await teacherModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Teacher deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all teacher",
    });
  }
};

module.exports = {
  createTeacherController,
  updateTeacherController,
  teacherController,
  singleTeacherController,
  deleteTeacherController,
};
