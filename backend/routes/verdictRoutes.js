import {getVerdict} from '../controllers/verdictController.js';
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/verdict', protect, getVerdict);
export default router;