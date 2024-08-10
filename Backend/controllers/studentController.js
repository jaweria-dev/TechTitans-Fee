const studentModel = require("../models/studentModel");
const fs = require("fs");
const slugify = require("slugify");
const { hashPassword, comparePassword } = require("../helpers/authhelper");
const teacherModel = require("../models/teacherModel");

const createStudentController = async (req, res) => {
  try {
    const { name, email, phone, rollNo, batchNo, teacher, password, answer } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !email:
        return res.status(500).send({ error: "Email is Required" });
      case !phone:
        return res.status(500).send({ error: "Phone is Required" });
      case !rollNo:
        return res.status(500).send({ error: "RollNo is Required" });
      case !batchNo:
        return res.status(500).send({ error: "batchNo is Required" });
      case !teacher:
        return res.status(500).send({ error: "Teacher is Required" });
      case !password:
        return res.status(500).send({ error: "Password is Required" });
      case !answer:
        return res.status(500).send({ error: "Answer is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const students = new studentModel({
      ...req.fields,
      password: hashedPassword,
      slug: slugify(name),
    });
    if (photo) {
      students.photo.data = fs.readFileSync(photo.path);
      students.photo.contentType = photo.type;
    }
    await students.save();
    res.status(201).send({
      success: true,
      message: "student Created Successfully",
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing students",
    });
  }
};

//get all STUDENTS
const getStudentController = async (req, res) => {
  try {
    const students = await studentModel
      .find({})
      .populate("teacher")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: students.length,
      message: "ALl Students ",
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting students",
      error: error.message,
    });
  }
};

// get single Student
const getSingleStudentController = async (req, res) => {
  try {
    const student = await studentModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("teacher");
    res.status(200).send({
      success: true,
      message: "Single Student Fetched",
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single student",
      error,
    });
  }
};

// get photo
const studentPhotoController = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.sid).select("photo");
    if (student.photo.data) {
      res.set("Content-type", student.photo.contentType);
      return res.status(200).send(student.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//update student
const updateStudentController = async (req, res) => {
  try {
    const { name, email, phone, rollNo, batchNo, teacher, password, answer } =
      req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is Required" });
      case !email:
        return res.status(400).send({ error: "Email is Required" });
      case !phone:
        return res.status(400).send({ error: "Phone is Required" });
      case !rollNo:
        return res.status(400).send({ error: "RollNo is Required" });
      case !batchNo:
        return res.status(400).send({ error: "BatchNo is Required" });
      case !teacher:
        return res.status(400).send({ error: "Teacher is Required" });
      case !password:
        return res.status(400).send({ error: "Password is Required" });
      case !answer:
        return res.status(400).send({ error: "Answer is Required" });
      case photo && photo.size > 1000000:
        return res.status(400).send({ error: "Photo should be less than 1MB" });
    }
    // Hash password
    const hashedPassword = await hashPassword(password);

    const student = await studentModel.findByIdAndUpdate(
      req.params.sid,
      { ...req.fields, password: hashedPassword, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      student.photo.data = fs.readFileSync(photo.path);
      student.photo.contentType = photo.type;
    }
    await student.save();

    res.status(201).send({
      success: true,
      message: "Student Updated Successfully",
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in updating student",
    });
  }
};

//delete controller
const deleteStudentController = async (req, res) => {
  try {
    await studentModel.findByIdAndDelete(req.params.sid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Student Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting student",
      error,
    });
  }
};

// filter syudent by teacher

const getStudentDataByTeacherId = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const students = await studentModel.find({ teacher: teacherId });
    res.status(200).send({
      success: true,
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while fetching student data",
      error,
    });
  }
};

const studentFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    // Apply filter by teacher if provided
    if (checked.length > 0) {
      args.teacher = checked;
    }

    // Apply filter by batchNo range if provided
    if (radio.length) {
      args.batchNo = { $gte: radio[0], $lte: radio[1] };
    }

    // Find students based on the filters
    const students = await studentModel.find(args);
    res.status(200).send({
      success: true,
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Students",
      error,
    });
  }
};

// const studentFiltersController = async (req, res) => {
//   try {
//     const { checked, radio } = req.body;
//     let args = {};
//     if (checked.length > 0) args.category = checked;
//     if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
//     const products = await studentModel.find(args);
//     res.status(200).send({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "Error WHile Filtering Products",
//       error,
//     });
//   }
// };

// Search Student ny keyword
const searchStudentController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await studentModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { email: { $regex: keyword, $options: "i" } },
          { rollNo: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Student API",
      error,
    });
  }
};

// Simmilar student
const relatedStudentController = async (req, res) => {
  try {
    const { sid, tid } = req.params;
    const students = await studentModel
      .find({
        teacher: tid,
        _id: { $ne: sid },
      })
      .select("-photo")
      .limit(3)
      .populate("teacher");
    res.status(200).send({
      success: true,
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting related students",
      error,
    });
  }
};

// get studebt bt teacher
const getStudentsByTeacherController = async (req, res) => {
  try {
    const teacher = await teacherModel.findOne({ slug: req.params.slug });
    if (!teacher) {
      return res.status(404).send({
        success: false,
        message: "Teacher not found",
      });
    }
    const students = await studentModel
      .find({ teacher: teacher._id })
      .populate("teacher");
    res.status(200).send({
      success: true,
      teacher,
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while getting students",
    });
  }
};

// student count
const studentCountController = async (req, res) => {
  try {
    const total = await studentModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

const studentListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const students = await studentModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

module.exports = {
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
};
