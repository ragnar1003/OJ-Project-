import express from 'express';
import { getProblem } from '../controllers/problemController.js';
const router = express.Router();
router.get('/problem', getProblem);
export default router;
