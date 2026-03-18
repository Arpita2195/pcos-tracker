import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Activity } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-card shadow-sm mx-4 mt-4 lg:mx-8 z-50 sticky top-4 rounded-2xl flex justify-between items-center py-4 px-6 md:px-10 border-white/60 backdrop-blur-lg">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-blush p-2 rounded-xl group-hover:bg-pink-300 transition-colors">
          <Activity className="text-darkBrown" size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-darkBrown">PCOS/PCOD Health</span>
      </Link>
      
      <div className="flex items-center gap-6 font-medium">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-pink-600 transition-colors hidden md:block">Dashboard</Link>
            <Link to="/checker" className="hover:text-pink-600 transition-colors hidden md:block">Symptoms</Link>
            <Link to="/tracker" className="hover:text-pink-600 transition-colors hidden md:block">Tracker</Link>
            <Link to="/profile" className="flex items-center gap-2 hover:bg-white/50 px-3 py-1.5 rounded-full transition-colors">
              <span className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center text-sm font-bold text-pink-800">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </Link>
            <button onClick={handleLogout} className="bg-white/50 hover:bg-white/80 px-4 py-2 rounded-xl transition-colors shadow-sm text-sm border border-white">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-pink-600 transition-colors hidden md:block">Login</Link>
            <Link to="/register" className="bg-darkBrown text-white hover:bg-stone-800 px-5 py-2.5 rounded-xl transition-colors shadow-md text-sm">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
