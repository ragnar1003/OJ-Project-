import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({quiet:true});
const DBconnection = async () => {
  const DB_URL = process.env.DB_URL;
  try {
    await mongoose.connect(DB_URL, {
});
    console.log("Connected to the database successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};
export default DBconnection;