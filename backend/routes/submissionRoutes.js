import express from "express";
import { getSubmission } from "../controllers/submissionController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile",protect,getSubmission);

export default router;
