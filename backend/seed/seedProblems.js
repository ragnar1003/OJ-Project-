import mongoose from "mongoose";
import DBconnection from "../database/db.js";
import Problem from "../model/Problem.js";
import problems from "./problems.js";

const seedProblems = async () => {
  try {
    await DBconnection();

    
    await Problem.deleteMany({});

   
    await Problem.insertMany(problems);
    console.log("Problems seeded successfully");
    process.exit();
  } catch (err) {
    console.error("Error seeding problems:", err);
    process.exit(1);
  }
};

seedProblems();