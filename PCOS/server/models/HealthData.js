import mongoose from 'mongoose';

// For the health tracker feature
const healthDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weight: { type: Number },
  mood: { type: String, enum: ['Happy', 'Neutral', 'Sad', 'Anxious', 'Stressed'] },
  cycleStartDate: { type: Date },
  cycleEndDate: { type: Date },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('HealthData', healthDataSchema);
