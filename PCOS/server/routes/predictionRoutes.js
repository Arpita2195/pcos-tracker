import express from 'express';
import { predictRisk } from '../controllers/predictionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, predictRisk);

export default router;
