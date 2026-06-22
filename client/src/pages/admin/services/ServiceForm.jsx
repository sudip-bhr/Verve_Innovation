import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useServices from '../../../hooks/admin/useServices';
import FormField from '../../../components/admin/ui/FormField';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function ServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getService, createService, updateService } = useServices();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    icon: 'LayoutGrid',
    isActive: true,
    order: 0
  });

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        setIsLoading(true);
        const data = await getService(id); // NOTE: getService uses slug but we can fetch all and filter or backend needs to support by ID.
        // wait, getService is implemented by slug. The route passes ID! 
        // Let's modify the hook to fetch all and find by ID if we pass ID, or just fetch the list to find it.
        // Actually, backend has `GET /api/services/:slug` and `PUT /api/services/:id`. 
        // We can just fetch all services and find the one we need by ID.
        const allServicesResponse = await fetch('/api/services'); 
        // Actually, we already have useServices hook. Let's just fetch all and find it to be safe, or just use `api.get('/services')`.
        // I will do it manually here.
        import('../../../lib/api').then(({ default: api }) => {
            api.get('/services').then(res => {
                const service = res.data.data.find(s => s._id === id);
                if (service) {
                    setFormData(service);
                } else {
                    navigate('/admin/services');
                }
                setIsLoading(false);
            }).catch(() => {
                navigate('/admin/services');
                setIsLoading(false);
            });
        });
      };
      loadData();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const payload = {
        ...formData,
        order: Number(formData.order) || 0
      };

      if (id) {
        await updateService(id, payload);
      } else {
        await createService(payload);
      }
      navigate('/admin/services');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--verve-accent-orange)]" />
      </div>
    );
  }

  // Common icons for preview
  const iconOptions = ['LayoutGrid', 'Smartphone', 'Monitor', 'Database', 'Cloud', 'Lock', 'PenTool', 'Code', 'TrendingUp', 'ShoppingCart'];
  const SelectedIcon = Icons[formData.icon] || Icons.LayoutGrid;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/services')}
          className="p-2 bg-[#13151a] hover:bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{id ? 'Edit Service' : 'New Service'}</h1>
          <p className="text-gray-400 text-sm">Fill in the details for the service.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#13151a] border border-white/10 rounded-xl p-6 md:p-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Title *" className="md:col-span-2">
            <input 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required
              className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]" 
            />
          </FormField>

          <FormField label="Icon Name (Lucide React)">
            <div className="flex gap-4">
                <input 
                  name="icon" 
                  value={formData.icon} 
                  onChange={handleChange}
                  className="flex-1 bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]" 
                />
                <div className="w-11 h-11 shrink-0 bg-[#0a0b0e] border border-white/10 rounded-lg flex items-center justify-center text-[var(--verve-accent-orange)]">
                    <SelectedIcon className="w-5 h-5" />
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
                Common icons: {iconOptions.join(', ')}
            </p>
          </FormField>

          <div className="flex items-end gap-2">
            <FormField label="Order" className="w-full">
              <input 
                type="number" 
                name="order" 
                value={formData.order} 
                onChange={handleChange}
                className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]" 
              />
            </FormField>
          </div>
        </div>

        <FormField label="Short Description *">
          <textarea 
            name="shortDescription" 
            value={formData.shortDescription} 
            onChange={handleChange}
            required
            rows={2}
            className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)] resize-y" 
          />
        </FormField>

        <FormField label="Full Description *">
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange}
            required
            rows={6}
            className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)] resize-y" 
          />
        </FormField>

        <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              name="isActive" 
              checked={formData.isActive} 
              onChange={handleChange} 
              className="w-4 h-4 rounded text-[var(--verve-accent-orange)] bg-[#0a0b0e] border-white/20 focus:ring-[var(--verve-accent-orange)]"
            />
            <span className="text-sm text-gray-300">Active (Visible)</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
          <button 
            type="button" 
            onClick={() => navigate('/admin/services')}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[var(--verve-accent-orange)] hover:bg-[#d94a11] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {id ? 'Save Changes' : 'Create Service'}
          </button>
        </div>

      </form>
    </div>
  );
}
