import express from "express";
//import codeController from "./controllers/codeController.js";
import { run } from "../controllers/codeController.js";

const router = express.Router();
router.post("/run", run);
export default router;

