import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { TrendingUp, Activity, Smile, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/tracker');
        // Transform data for charts
        const formatted = res.data.map(d => ({
          ...d,
          formattedDate: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          weight: d.weight || null
        })).reverse(); // Oldest to newest
        setData(formatted);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center font-medium">Loading Dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-darkBrown mb-2">Welcome back, {user?.name.split(' ')[0]}</h1>
          <p className="text-stone-600 font-medium">Here is your health overview for recent days.</p>
        </div>
        <Link to="/tracker" className="bg-pink-100 text-pink-800 font-bold px-5 py-2.5 rounded-xl hover:bg-pink-200 transition-colors shadow-sm inline-flex items-center gap-2">
          <Activity size={18} /> Log Today
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Quick Stats */}
        <div className="glass-card p-6 flex flex-col justify-between hover:scale-105 transition-transform cursor-default">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-stone-600 text-sm uppercase tracking-wider">Latest Weight</h3>
            <div className="bg-pink-500/10 p-2 rounded-lg"><Activity className="text-pink-600" size={20}/></div>
          </div>
          <p className="text-4xl font-extrabold text-darkBrown">
            {data.length > 0 && data[data.length-1].weight ? data[data.length-1].weight + ' kg' : '--'}
          </p>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between hover:scale-105 transition-transform cursor-default">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-stone-600 text-sm uppercase tracking-wider">Recent Mood</h3>
            <div className="bg-amber-500/10 p-2 rounded-lg"><Smile className="text-amber-600" size={20}/></div>
          </div>
          <p className="text-3xl font-extrabold text-darkBrown">
            {data.length > 0 ? data[data.length-1].mood : '--'}
          </p>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between hover:scale-105 transition-transform cursor-default">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-stone-600 text-sm uppercase tracking-wider">Cycle Status</h3>
            <div className="bg-purple-500/10 p-2 rounded-lg"><CalendarDays className="text-purple-600" size={20}/></div>
          </div>
          <p className="text-lg font-bold text-stone-800">
            {data.filter(d => d.cycleStartDate).length > 0 
                ? `Last started: ${new Date(data.filter(d => d.cycleStartDate).pop().cycleStartDate).toLocaleDateString()}` 
                : 'Not tracked yet'}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><TrendingUp className="text-pink-600" /> Weight Trend</h3>
          {data.length > 0 ? (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="formattedDate" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis domain={['auto', 'auto']} stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={val => `${val}kg`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255,255,255,0.9)' }}
                  />
                  <Area type="monotone" dataKey="weight" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
             <div className="h-72 flex items-center justify-center text-stone-400 font-medium">No weight data logged yet.</div>
          )}
        </div>

        <div className="glass-card p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-pink-500"></div> PCOS Risk Status</h3>
          <div className="bg-white/50 p-6 rounded-2xl h-72 flex flex-col justify-center items-center text-center">
            <h4 className="text-lg font-semibold text-stone-600 mb-2">Have you checked your symptoms recently?</h4>
            <p className="text-sm text-stone-500 mb-6 max-w-xs">Take the AI symptom checker assessment to understand your PCOS risk level.</p>
            <Link to="/checker" className="bg-darkBrown text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-stone-800 transition-colors">
              Take Assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
