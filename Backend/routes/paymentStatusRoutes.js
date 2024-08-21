// routes/paymentRoutes.js

const express = require("express");
const router = express.Router();
const Payment = require("../models/paymentStatusModel");
const Student = require("../models/studentModel");

// Save a payment for a student
router.post("/save", async (req, res) => {
  const { studentId, month, amount } = req.body;

  try {
    const payment = new Payment({
      studentId,
      month,
      amount,
      status: "Completed", // You can change this depending on your logic
    });

    await payment.save();

    res.status(201).json({ message: "Payment saved successfully", payment });
  } catch (error) {
    res.status(500).json({ message: "Failed to save payment", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const payments = await Payment.find({ studentId: student._id }).select(
      "month amount status date"
    );

    res.status(200).json({ student, payments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve student details", error });
  }
});

module.exports = router;
