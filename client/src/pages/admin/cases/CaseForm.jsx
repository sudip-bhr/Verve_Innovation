import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCases from '../../../hooks/admin/useCases';
import FormField from '../../../components/admin/ui/FormField';
import ImageUploader from '../../../components/admin/ui/ImageUploader';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function CaseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCase, createCase, updateCase } = useCases();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    categories: [],
    clientIndustry: '',
    summary: '',
    description: '',
    tags: [],
    coverImage: '',
    layout: 'grid',
    isFeatured: false,
    isActive: true,
    order: 0
  });

  const [categoriesStr, setCategoriesStr] = useState('');
  const [tagsStr, setTagsStr] = useState('');

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        setIsLoading(true);
        const data = await getCase(id);
        if (data) {
          setFormData(data);
          setCategoriesStr(data.categories?.join(', ') || '');
          setTagsStr(data.tags?.join(', ') || '');
        } else {
          navigate('/admin/cases');
        }
        setIsLoading(false);
      };
      loadData();
    }
  }, [id, getCase, navigate]);

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
        categories: categoriesStr.split(',').map(s => s.trim()).filter(Boolean),
        tags: tagsStr.split(',').map(s => s.trim()).filter(Boolean),
        order: Number(formData.order) || 0
      };

      if (id) {
        await updateCase(id, payload);
      } else {
        await createCase(payload);
      }
      navigate('/admin/cases');
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/cases')}
          className="p-2 bg-[#13151a] hover:bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{id ? 'Edit Case Study' : 'New Case Study'}</h1>
          <p className="text-gray-400 text-sm">Fill in the details for the portfolio project.</p>
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

          <FormField label="Client Industry">
            <input 
              name="clientIndustry" 
              value={formData.clientIndustry} 
              onChange={handleChange}
              className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]" 
            />
          </FormField>

          <FormField label="Layout Style">
            <select 
              name="layout" 
              value={formData.layout} 
              onChange={handleChange}
              className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]"
            >
              <option value="grid">Grid</option>
              <option value="feature">Feature (Large)</option>
            </select>
          </FormField>

          <FormField label="Categories (comma separated)">
            <input 
              value={categoriesStr} 
              onChange={e => setCategoriesStr(e.target.value)}
              placeholder="e.g. Web App, UX/UI, Mobile"
              className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]" 
            />
          </FormField>

          <FormField label="Tags (comma separated)">
            <input 
              value={tagsStr} 
              onChange={e => setTagsStr(e.target.value)}
              placeholder="e.g. React, Node.js, AWS"
              className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]" 
            />
          </FormField>
        </div>

        <FormField label="Summary (Short description) *">
          <textarea 
            name="summary" 
            value={formData.summary} 
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

        <div>
          <ImageUploader 
            label="Cover Image" 
            value={formData.coverImage} 
            onChange={(url) => setFormData(prev => ({ ...prev, coverImage: url }))} 
          />
        </div>

        <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              name="isFeatured" 
              checked={formData.isFeatured} 
              onChange={handleChange} 
              className="w-4 h-4 rounded text-[var(--verve-accent-orange)] bg-[#0a0b0e] border-white/20 focus:ring-[var(--verve-accent-orange)]"
            />
            <span className="text-sm text-gray-300">Featured Case Study</span>
          </label>

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

          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm text-gray-400">Order</label>
            <input 
              type="number" 
              name="order" 
              value={formData.order} 
              onChange={handleChange}
              className="w-20 bg-[#0a0b0e] border border-white/10 rounded-lg px-3 py-1.5 text-white text-center focus:outline-none focus:border-[var(--verve-accent-orange)]" 
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
          <button 
            type="button" 
            onClick={() => navigate('/admin/cases')}
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
            {id ? 'Save Changes' : 'Create Case Study'}
          </button>
        </div>

      </form>
    </div>
  );
}
