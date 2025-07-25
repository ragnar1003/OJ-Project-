import {getVerdict} from '../controllers/verdictController.js';
import express from 'express';
const router = express.Router();

router.get('/verdict', getVerdict);
export default router;