require("dotenv").config();
const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51Pg5eaRunlLVaZ2Qz31ndkSbxMlj66WYait44gI1xE5HHuEU6UCCxqUhSSqg956BL97pGKMjJbIjG1nK7aKCyyZD00lKHFIqiL"
);

const connectToDatabase = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentsRoutes = require("./routes/studentsRoutes");
const qrCodeRoutes = require("./routes/qrcodeRoutes");
const paymentRoute = require("./routes/payment");

// Rest object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
// app.use(notificationRoutes);

// Routes
app.use("/api/fee/portal", authRoutes);
app.use("/api/fee/portal/teacher", teacherRoutes);
app.use("/api/fee/portal/students", studentsRoutes);
app.use("/api/qrcode", qrCodeRoutes);
app.use("/api/payment", paymentRoute);

// Payment Intent Route (Stripe)
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Root API
app.get("/", (req, res) => {
  res.send("<h1>Welcome to TechTitans Fee Portal</h1>");
});

// Database Connection
connectToDatabase();

// Port
const Port = process.env.Port || 9000;

// Run listening
app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`.bgWhite.black);
});

// For Vercel
module.exports = app;
