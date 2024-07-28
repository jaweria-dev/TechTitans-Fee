const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");

const dbConn = process.env.MONGODB_URL;

const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(dbConn);
    console.log(
      `Connection to mongodb database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`.bgRed.white);
  }
};

module.exports = connectToDatabase;
