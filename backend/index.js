
import express from "express";
import DBconnection from "./database/db.js";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
DBconnection();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Use the auth routes
app.use("/", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});