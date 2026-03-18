import Symptom from '../models/Symptom.js';
import { getRecommendations } from '../services/recommendationService.js';

export const calculateRisk = (symptoms) => {
  let score = 0;
  if (symptoms.irregularPeriods) score += 2; // heavier weight
  if (symptoms.weightGain) score += 1;
  if (symptoms.acne) score += 1;
  if (symptoms.hairLoss) score += 1;
  if (symptoms.moodSwings) score += 1;

  if (score >= 4) return 'High';
  if (score >= 2) return 'Medium';
  return 'Low';
};

// @desc    Calculate risk and save symptoms
// @route   POST /api/predict
// @access  Private
export const predictRisk = async (req, res) => {
  try {
    const { irregularPeriods, weightGain, acne, hairLoss, moodSwings } = req.body;

    const riskLevel = calculateRisk({ irregularPeriods, weightGain, acne, hairLoss, moodSwings });
    const recommendations = getRecommendations(riskLevel);

    // Save to database
    const symptomEntry = await Symptom.create({
      user: req.user._id,
      irregularPeriods,
      weightGain,
      acne,
      hairLoss,
      moodSwings,
      riskLevel
    });

    let explanation = `Based on the common symptoms associated with PCOS, your profile indicates a ${riskLevel} risk. `;
    if (riskLevel === 'High') {
      explanation += `Multiple key indicators like irregular periods and other symptoms are present. We strongly recommend consulting a healthcare professional.`;
    } else if (riskLevel === 'Medium') {
      explanation += `Some symptoms are present. It's advisable to monitor these and adopt healthy lifestyle changes.`;
    } else {
      explanation += `You have very few to no symptoms commonly associated with PCOS. Keep up the healthy habits!`;
    }

    res.status(201).json({
      success: true,
      riskLevel,
      explanation,
      recommendations,
      data: symptomEntry
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
