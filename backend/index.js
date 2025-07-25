
import express from "express";
import DBconnection from "./database/db.js";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import codeRoutes from "./routes/codeRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import verdictRoutes from "./routes/verdictRoutes.js";
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

//run route 
app.use("/",codeRoutes);

app.use("/",problemRoutes);

app.use("/",verdictRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});