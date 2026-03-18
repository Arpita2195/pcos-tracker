export const getRecommendations = (riskLevel) => {
  if (riskLevel === 'Low') {
    return {
      diet: [
        'Maintain a balanced diet with whole grains, lean proteins, and plenty of vegetables.',
        'Stay hydrated and limit processed foods.'
      ],
      exercise: [
        'Engage in at least 150 minutes of moderate aerobic activity per week.',
        'Include strength training 2 days a week.'
      ],
      lifestyle: [
        'Ensure you get 7-9 hours of quality sleep.',
        'Manage stress through mindfulness or yoga.'
      ]
    };
  } else if (riskLevel === 'Medium') {
    return {
      diet: [
        'Focus on a low glycemic index (GI) diet to help manage blood sugar.',
        'Increase intake of fiber-rich foods like beans, lentils, and oats.',
        'Limit sugary snacks and beverages.'
      ],
      exercise: [
        'Aim for a mix of cardio and resistance training (3-4 times a week).',
        'Consider moderate-intensity workouts like brisk walking, cycling, or swimming.'
      ],
      lifestyle: [
        'Monitor your menstrual cycle regularly.',
        'Practice stress-reduction techniques like meditation.',
        'Consider consulting a healthcare provider for a thorough checkup.'
      ]
    };
  } else {
    // High
    return {
      diet: [
        'Adopt a strict anti-inflammatory and low-GI diet.',
        'Work with a registered dietitian for a personalized meal plan.',
        'Avoid refined carbohydrates and high-sugar foods.'
      ],
      exercise: [
        'Incorporate daily physical activity to improve insulin sensitivity.',
        'Try HIIT (High-Intensity Interval Training) if comfortable, or consistent moderate workouts.',
      ],
      lifestyle: [
        'Please consult an endocrinologist or gynecologist for a proper medical evaluation.',
        'Track all symptoms, cycles, and weight fluctuations.',
        'Prioritize severe stress management and regular sleep schedules.'
      ]
    };
  }
};
