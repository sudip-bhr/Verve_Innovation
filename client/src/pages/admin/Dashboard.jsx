import { useEffect } from 'react';
import { Briefcase, Users, MessageSquare, Layers } from 'lucide-react';
import StatCard from '../../components/admin/ui/StatCard';
import useCases from '../../hooks/admin/useCases';
import useServices from '../../hooks/admin/useServices';
import useTeam from '../../hooks/admin/useTeam';
import useContacts from '../../hooks/admin/useContacts';
import { Link } from 'react-router-dom';
import StatusBadge from '../../components/admin/ui/StatusBadge';

export default function Dashboard() {
  const { cases, fetchCases } = useCases();
  const { services, fetchServices } = useServices();
  const { team, fetchTeam } = useTeam();
  const { contacts, fetchContacts } = useContacts();

  useEffect(() => {
    fetchCases();
    fetchServices();
    fetchTeam();
    fetchContacts();
  }, [fetchCases, fetchServices, fetchTeam, fetchContacts]);

  const newContacts = contacts.filter(c => c.status === 'new');
  
  // Get latest 5 contacts
  const recentContacts = [...contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome to the Verve admin panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Cases" value={cases.length} icon={Briefcase} />
        <StatCard title="Active Services" value={services.length} icon={Layers} />
        <StatCard title="Team Members" value={team.length} icon={Users} />
        <StatCard title="New Contacts" value={newContacts.length} icon={MessageSquare} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Contacts</h2>
            <Link to="/admin/contacts" className="text-sm text-[var(--verve-accent-orange)] hover:underline">
              View all
            </Link>
          </div>
          
          <div className="bg-[#13151a] border border-white/10 rounded-xl overflow-hidden">
            {recentContacts.length > 0 ? (
              <div className="divide-y divide-white/5">
                {recentContacts.map(contact => (
                  <div key={contact._id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div>
                      <p className="font-medium text-white">{contact.firstName} {contact.lastName}</p>
                      <p className="text-sm text-gray-400">{contact.email}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={contact.status} />
                      <span className="text-xs text-gray-500">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-400">No recent contacts found.</div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
          <div className="bg-[#13151a] border border-white/10 rounded-xl p-4 space-y-2">
            <Link to="/admin/cases/new" className="block px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
              + Add new Case Study
            </Link>
            <Link to="/admin/blogs/new" className="block px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
              + Write new Blog Post
            </Link>
            <Link to="/admin/services/new" className="block px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
              + Add new Service
            </Link>
            <Link to="/admin/team/new" className="block px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
              + Add Team Member
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
