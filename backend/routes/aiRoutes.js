import express from "express";

const router = express.Router();

import { getAIResponse } from "../controllers/aiController.js";

router.post("/ai", getAIResponse);
export default router;
