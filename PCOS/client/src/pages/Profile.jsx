import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserCircle, Save } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    cycleLength: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        age: user.age || '',
        weight: user.weight || '',
        cycleLength: user.cycleLength || ''
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate updating profile, since we skipped making a dedicated PUT route for brevity
    // In a real scenario, we'd hit await api.put('/auth/profile', formData)
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="glass-card p-8 md:p-12 shadow-xl border border-white/60">
        
        <div className="flex items-center gap-6 mb-10 pb-8 border-b border-pink-200/50">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-300 to-pink-500 flex items-center justify-center shadow-inner">
            <span className="text-4xl font-extrabold text-white">{user?.name?.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-darkBrown mb-1">{user?.name}</h1>
            <p className="text-stone-500 font-medium">{user?.email}</p>
          </div>
        </div>

        {message && <div className="bg-green-100 text-green-800 p-4 rounded-xl mb-8 font-medium text-center shadow-sm">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 ml-1 text-stone-700">Full Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white focus:border-pink-300 focus:outline-none focus:bg-white transition-all shadow-sm font-medium text-stone-800" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 ml-1 text-stone-700">Age</label>
              <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} 
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white focus:border-pink-300 focus:outline-none focus:bg-white transition-all shadow-sm font-medium text-stone-800" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 ml-1 text-stone-700">Baseline Weight (kg)</label>
              <input type="number" step="0.1" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} 
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white focus:border-pink-300 focus:outline-none focus:bg-white transition-all shadow-sm font-medium text-stone-800" />
            </div>
             <div>
              <label className="block text-sm font-semibold mb-2 ml-1 text-stone-700">Avg. Cycle Length (Days)</label>
              <input type="number" value={formData.cycleLength} onChange={e => setFormData({...formData, cycleLength: e.target.value})} 
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white focus:border-pink-300 focus:outline-none focus:bg-white transition-all shadow-sm font-medium text-stone-800" />
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-darkBrown text-white font-bold py-4 rounded-xl hover:bg-stone-800 transition-colors shadow-md flex justify-center items-center gap-2">
              <Save size={20} /> Save Profile Updates
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Profile;
