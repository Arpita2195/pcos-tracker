import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  weight: { type: Number },
  cycleLength: { type: Number }, // Average menstrual cycle length
}, { timestamps: true });

export default mongoose.model('User', userSchema);
