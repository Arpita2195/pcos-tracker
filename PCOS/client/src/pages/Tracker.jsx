import { useState } from 'react';
import api from '../services/api';
import { Calendar, Activity, Smile } from 'lucide-react';

const Tracker = () => {
  const [formData, setFormData] = useState({
    weight: '',
    mood: 'Neutral',
    cycleStartDate: '',
    cycleEndDate: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tracker', formData);
      setMessage('Tracker updated successfully!');
      setFormData({ weight: '', mood: 'Neutral', cycleStartDate: '', cycleEndDate: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setMessage('Failed to update tracker.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-darkBrown mb-4">Daily Health Tracker</h1>
        <p className="text-stone-600 text-lg">Log your metrics to monitor your trends over time.</p>
      </div>

      <div className="glass-card p-8 md:p-10 shadow-lg">
        {message && <div className="bg-green-100 text-green-800 p-4 rounded-xl mb-6 font-medium text-center">{message}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Weight */}
            <div className="bg-white/40 p-6 rounded-2xl border border-white">
              <label className="flex items-center gap-2 text-lg font-bold mb-4 text-stone-800">
                <Activity className="text-pink-600" /> Current Weight (kg)
              </label>
              <input 
                type="number" step="0.1" required
                value={formData.weight}
                onChange={e => setFormData({...formData, weight: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white focus:border-pink-300 focus:outline-none text-lg"
                placeholder="e.g. 65.5"
              />
            </div>

            {/* Mood */}
            <div className="bg-white/40 p-6 rounded-2xl border border-white">
              <label className="flex items-center gap-2 text-lg font-bold mb-4 text-stone-800">
                <Smile className="text-amber-500" /> Today's Mood
              </label>
              <select 
                value={formData.mood}
                onChange={e => setFormData({...formData, mood: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white focus:border-pink-300 focus:outline-none text-lg"
              >
                <option value="Happy">Happy</option>
                <option value="Neutral">Neutral</option>
                <option value="Anxious">Anxious</option>
                <option value="Stressed">Stressed</option>
                <option value="Sad">Sad</option>
              </select>
            </div>
          </div>

          <div className="bg-white/40 p-6 rounded-2xl border border-white">
             <label className="flex items-center gap-2 text-lg font-bold mb-4 text-stone-800">
                <Calendar className="text-purple-600" /> Cycle Tracking
              </label>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <span className="block text-sm font-semibold mb-2 ml-1 text-stone-600">Cycle Start Date (if applicable today)</span>
                  <input 
                    type="date"
                    value={formData.cycleStartDate}
                    onChange={e => setFormData({...formData, cycleStartDate: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white focus:outline-none"
                  />
                </div>
                <div>
                  <span className="block text-sm font-semibold mb-2 ml-1 text-stone-600">Cycle End Date (if applicable today)</span>
                  <input 
                    type="date"
                    value={formData.cycleEndDate}
                    onChange={e => setFormData({...formData, cycleEndDate: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white focus:outline-none"
                  />
                </div>
              </div>
          </div>

          <button type="submit" className="w-full bg-darkBrown text-white font-bold py-4 rounded-xl hover:bg-stone-800 transition-colors shadow-md text-lg">
            Save Today's Log
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tracker;
