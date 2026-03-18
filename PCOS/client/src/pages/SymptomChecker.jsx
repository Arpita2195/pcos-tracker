import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Activity, ShieldAlert, CheckCircle, Info } from 'lucide-react';

const SymptomChecker = () => {
  const { user } = useContext(AuthContext);
  const [symptoms, setSymptoms] = useState({
    irregularPeriods: false,
    weightGain: false,
    acne: false,
    hairLoss: false,
    moodSwings: false
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/predict', symptoms);
      setResult(data);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (field) => {
    setSymptoms(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Activity className="text-pink-600" size={36} />
        <h1 className="text-4xl font-extrabold text-darkBrown">AI Symptom Checker</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Log Your Symptoms</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {[
              { id: 'irregularPeriods', label: 'Irregular or Missed Periods' },
              { id: 'weightGain', label: 'Recent Unexplained Weight Gain' },
              { id: 'acne', label: 'Severe Hormonal Acne' },
              { id: 'hairLoss', label: 'Hair Loss or Thinning (Alopecia)' },
              { id: 'moodSwings', label: 'Frequent Mood Swings or Anxiety' },
            ].map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white hover:bg-white/60 transition-colors">
                <span className="font-medium text-stone-800">{item.label}</span>
                <button 
                  type="button" 
                  onClick={() => handleToggle(item.id)}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${symptoms[item.id] ? 'bg-pink-500' : 'bg-stone-300'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${symptoms[item.id] ? 'translate-x-8' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}

            <button disabled={loading} type="submit" className="w-full bg-darkBrown text-white font-bold py-4 rounded-xl hover:bg-stone-800 transition-colors shadow-md mt-4 flex justify-center items-center gap-2">
              {loading ? 'Analyzing...' : 'Analyze Symptoms'}
            </button>
          </form>
        </div>

        <div>
          {result ? (
            <div className="glass-card p-8 bg-gradient-to-br from-white/60 to-white/30 border border-white h-full animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                {result.riskLevel === 'High' ? <ShieldAlert className="text-red-500" size={40} /> : <CheckCircle className="text-green-500" size={40} />}
                <div>
                  <h3 className="text-2xl font-bold">Analysis Complete</h3>
                  <p className="text-stone-600 font-medium">Risk Level: <span className={`font-bold ${result.riskLevel === 'High' ? 'text-red-600' : result.riskLevel === 'Medium' ? 'text-amber-600' : 'text-green-600'}`}>{result.riskLevel}</span></p>
                </div>
              </div>
              
              <div className="bg-white/60 p-5 rounded-2xl mb-6 shadow-sm border border-white/40">
                <p className="text-stone-800 leading-relaxed font-medium">{result.explanation}</p>
              </div>

              <h4 className="text-xl font-bold mb-4 flex items-center gap-2"><Info size={20} className="text-pink-600" /> Personalized Plan</h4>
              
              <div className="space-y-6">
                <div>
                  <h5 className="font-bold text-amber-800 mb-2">Diet Suggestions</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-stone-700">
                    {result.recommendations.diet.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-blue-800 mb-2">Exercise Routine</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-stone-700">
                    {result.recommendations.exercise.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-purple-800 mb-2">Lifestyle Adjustments</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-stone-700">
                    {result.recommendations.lifestyle.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-8 h-full flex flex-col items-center justify-center text-center opacity-70">
              <ShieldAlert className="text-stone-400 mb-4" size={64} />
              <h3 className="text-xl font-bold text-stone-600 mb-2">No Analysis Yet</h3>
              <p className="text-stone-500 max-w-sm">Submit your symptoms on the left to receive your AI-powered health risk assessment and plan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
