const studentModel = require("../models/studentModel");
const fs = require("fs");
const slugify = require("slugify");
const { hashPassword, comparePassword } = require("../helpers/authhelper");

const createStudentController = async (req, res) => {
  try {
    const { name, email, phone, rollNo, batchNo, teacher, password, answer } = req.fields;
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

    const students = new studentModel({ ...req.fields, password: hashedPassword, slug: slugify(name) });
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

module.exports = {
  createStudentController,
};
