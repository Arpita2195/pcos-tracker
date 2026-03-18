import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mt-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-pink-200/50 text-sm font-medium mb-8">
          <Sparkles size={16} className="text-pink-500" />
          <span>Your personal AI health companion</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-darkBrown leading-tight mb-6">
          Take control of your <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-amber-700">PCOS Journey</span>
        </h1>
        
        <p className="text-lg text-stone-700 mb-10 max-w-2xl mx-auto leading-relaxed">
          Track symptoms, predict risks, and get personalized wellness recommendations powered by data. A modern platform built for women's health.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="bg-darkBrown text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all md:text-lg font-semibold">
            Get Started Free
          </Link>
          <Link to="/login" className="glass-card hover:bg-white/60 px-8 py-4 rounded-2xl transition-all md:text-lg font-semibold flex flex-row items-center justify-center">
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mt-32 w-full">
        <div className="glass-card p-8 flex flex-col items-start hover:-translate-y-2 transition-transform">
          <div className="bg-white/70 p-4 rounded-2xl mb-6 shadow-sm">
            <ShieldCheck className="text-amber-700" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3">Symptom Checker</h3>
          <p className="text-stone-700 leading-relaxed">
            Log your daily symptoms and get instant AI-driven risk prediction on your PCOS status.
          </p>
        </div>
        
        <div className="glass-card p-8 flex flex-col items-start hover:-translate-y-2 transition-transform">
          <div className="bg-white/70 p-4 rounded-2xl mb-6 shadow-sm">
            <TrendingUp className="text-pink-600" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3">Health Tracking</h3>
          <p className="text-stone-700 leading-relaxed">
            Monitor your weight, mood, and cycle lengths over time with beautiful, easy-to-read charts.
          </p>
        </div>

        <div className="glass-card p-8 flex flex-col items-start hover:-translate-y-2 transition-transform">
          <div className="bg-white/70 p-4 rounded-2xl mb-6 shadow-sm">
            <Activity className="text-rose-500" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3">Personalized Guidance</h3>
          <p className="text-stone-700 leading-relaxed">
            Receive custom diet, lifestyle, and exercise recommendations tailored to your risk level.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
