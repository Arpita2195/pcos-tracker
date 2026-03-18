import HealthData from '../models/HealthData.js';

// @desc    Add health tracker data
// @route   POST /api/tracker
// @access  Private
export const addHealthData = async (req, res) => {
  try {
    const { weight, mood, cycleStartDate, cycleEndDate, date } = req.body;

    const data = await HealthData.create({
      user: req.user._id,
      weight,
      mood,
      cycleStartDate,
      cycleEndDate,
      date: date || Date.now()
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get current user's health tracker data
// @route   GET /api/tracker
// @access  Private
// @desc    Get current user's health tracker data
export const getHealthData = async (req, res) => {
  try {
    const data = await HealthData.find({ user: req.user._id }).sort({ date: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
