import {getVerdict} from '../controllers/verdictController.js';
import express from 'express';
const router = express.Router();

router.post('/verdict', getVerdict);
export default router;