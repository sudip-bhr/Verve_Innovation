import { useAuth } from '../../../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminTopbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <header className="h-16 border-b border-white/10 bg-[#0a0b0e]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Mobile menu button could go here */}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-full bg-[var(--verve-accent-orange)]/20 flex items-center justify-center text-[var(--verve-accent-orange)]">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:block">
            <p className="font-medium">{user?.email}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="text-gray-400 hover:text-white transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
