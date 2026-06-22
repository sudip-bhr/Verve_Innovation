import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Layers, 
  Users, 
  BarChart, 
  MessageSquare, 
  Star, 
  FileText
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Cases', path: '/admin/cases', icon: Briefcase },
  { name: 'Services', path: '/admin/services', icon: Layers },
  { name: 'Team', path: '/admin/team', icon: Users },
  { name: 'Stats', path: '/admin/stats', icon: BarChart },
  { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
  { name: 'Contacts', path: '/admin/contacts', icon: MessageSquare },
  { name: 'Blog', path: '/admin/blogs', icon: FileText },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r border-white/10 bg-[#0a0b0e] flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
        <span className="font-bold text-xl tracking-tight">Verve Admin</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-[var(--verve-accent-orange)]/10 text-[var(--verve-accent-orange)]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                `}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
