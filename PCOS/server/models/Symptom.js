import mongoose from 'mongoose';

const symptomSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  irregularPeriods: { type: Boolean, required: true },
  weightGain: { type: Boolean, required: true },
  acne: { type: Boolean, required: true },
  hairLoss: { type: Boolean, required: true },
  moodSwings: { type: Boolean, required: true },
  riskLevel: { type: String, enum: ['Low', 'Medium', 'High'] },
}, { timestamps: true });

export default mongoose.model('Symptom', symptomSchema);
