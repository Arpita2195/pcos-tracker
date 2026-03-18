import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-10">
      <div className="glass-card w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-pink-100 p-3 rounded-2xl mb-4 shadow-sm">
            <Activity className="text-pink-600" size={32} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Join PCOS Platform</h2>
          <p className="text-stone-600">Create an account to track your symptoms</p>
        </div>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-6 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 ml-1">Full Name</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white focus:border-pink-300 focus:bg-white focus:outline-none transition-all shadow-sm" 
              placeholder="Enter your full name" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 ml-1">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white focus:border-pink-300 focus:bg-white focus:outline-none transition-all shadow-sm" 
              placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 ml-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white focus:border-pink-300 focus:bg-white focus:outline-none transition-all shadow-sm" 
              placeholder="Create a password" />
          </div>
          <button type="submit" className="w-full bg-darkBrown text-white font-bold py-3.5 rounded-xl hover:bg-stone-800 transition-colors shadow-md mt-4">
            Create Account
          </button>
        </form>
        
        <p className="text-center mt-8 text-sm text-stone-600 font-medium">
          Already have an account? <Link to="/login" className="text-pink-600 font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
