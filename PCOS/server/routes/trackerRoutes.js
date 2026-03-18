import express from 'express';
import { addHealthData, getHealthData } from '../controllers/trackerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, addHealthData)
  .get(protect, getHealthData);

export default router;
