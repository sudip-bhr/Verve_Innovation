import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useContacts from '../../../hooks/admin/useContacts';
import { Loader2, ArrowLeft, Mail, Phone, Building, Briefcase, Calendar, DollarSign, Globe } from 'lucide-react';
import StatusBadge from '../../../components/admin/ui/StatusBadge';

export default function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getContact, updateStatus } = useContacts();
  
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const loadContact = async () => {
      setIsLoading(true);
      const data = await getContact(id);
      if (data) {
        setContact(data);
      } else {
        navigate('/admin/contacts');
      }
      setIsLoading(false);
    };
    if (id) loadContact();
  }, [id, getContact, navigate]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setIsUpdating(true);
    await updateStatus(id, newStatus);
    setContact(prev => ({ ...prev, status: newStatus }));
    setIsUpdating(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--verve-accent-orange)]" />
      </div>
    );
  }

  if (!contact) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/contacts')}
            className="p-2 bg-[#13151a] hover:bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Contact Details</h1>
            <p className="text-gray-400 text-sm">Reviewing inquiry from {contact.firstName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Status:</span>
          {isUpdating ? (
            <Loader2 className="w-5 h-5 animate-spin text-[var(--verve-accent-orange)]" />
          ) : (
            <select 
              value={contact.status}
              onChange={handleStatusChange}
              className="bg-[#13151a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[var(--verve-accent-orange)]"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#13151a] border border-white/10 rounded-xl p-6 md:p-8">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center justify-between">
              <span>Message</span>
              <StatusBadge status={contact.status} />
            </h2>
            <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
              {contact.message || <span className="text-gray-500 italic">No message provided.</span>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#13151a] border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Contact Info</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">Name</p>
                <p className="text-white font-medium">{contact.firstName} {contact.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider flex items-center gap-1"><Mail className="w-3 h-3" /> Email</p>
                <a href={`mailto:${contact.email}`} className="text-[var(--verve-accent-orange)] hover:underline break-all">
                  {contact.email}
                </a>
              </div>
              {contact.phone && (
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</p>
                  <a href={`tel:${contact.phone}`} className="text-gray-300 hover:text-white">
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact.companyName && (
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider flex items-center gap-1"><Building className="w-3 h-3" /> Company</p>
                  <p className="text-gray-300">{contact.companyName}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#13151a] border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Project Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider flex items-center gap-1"><Briefcase className="w-3 h-3" /> Type</p>
                <p className="text-white">{contact.projectType || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider flex items-center gap-1"><DollarSign className="w-3 h-3" /> Budget</p>
                <p className="text-white">{contact.budgetRange || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider flex items-center gap-1"><Globe className="w-3 h-3" /> Source</p>
                <p className="text-white capitalize">{contact.source}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider flex items-center gap-1"><Calendar className="w-3 h-3" /> Submitted</p>
                <p className="text-gray-300">{new Date(contact.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
