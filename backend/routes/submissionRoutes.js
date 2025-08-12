import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getSubmissionHistory } from '../controllers/submissionController.js';

const router = express.Router();

router.get('/', protect, getSubmissionHistory);

export default router;
