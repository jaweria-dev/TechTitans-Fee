require("dotenv").config();
const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// import
const connectToDatabase = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentsRoutes = require("./routes/studentsRoutes");
const JWT = require("jsonwebtoken");

// Rest object
const app = express();

// middlware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/fee/portal", authRoutes);
app.use("/api/fee/portal/teacher", teacherRoutes);
app.use("/api/fee/portal/students", studentsRoutes);

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to TechTitans Fee Portal</h1>");
});

// db connect config
connectToDatabase();

// Port
const Port = process.env.Port || 9000;

// run listening
app.listen(Port, () => {
  console.log(`Server is listening ${Port}`.bgWhite.black);
});

// for vercel
module.exports = app;
