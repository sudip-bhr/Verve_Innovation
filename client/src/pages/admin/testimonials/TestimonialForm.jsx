import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTestimonials from '../../../hooks/admin/useTestimonials';
import FormField from '../../../components/admin/ui/FormField';
import ImageUploader from '../../../components/admin/ui/ImageUploader';
import { Loader2, ArrowLeft, Save } from 'lucide-react';

export default function TestimonialForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTestimonial, createTestimonial, updateTestimonial } = useTestimonials();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    quote: '',
    authorName: '',
    authorRole: '',
    authorCompany: '',
    authorPhoto: '',
    isActive: true
  });

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        setIsLoading(true);
        const data = await getTestimonial(id);
        if (data) {
          setFormData(data);
        } else {
          navigate('/admin/testimonials');
        }
        setIsLoading(false);
      };
      loadData();
    }
  }, [id, getTestimonial, navigate]);

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
      if (id) {
        await updateTestimonial(id, formData);
      } else {
        await createTestimonial(formData);
      }
      navigate('/admin/testimonials');
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
          onClick={() => navigate('/admin/testimonials')}
          className="p-2 bg-[#13151a] hover:bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{id ? 'Edit Testimonial' : 'New Testimonial'}</h1>
          <p className="text-gray-400 text-sm">Fill in the details for the client review.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#13151a] border border-white/10 rounded-xl p-6 md:p-8 space-y-8">
        
        <FormField label="Quote *">
          <textarea 
            name="quote" 
            value={formData.quote} 
            onChange={handleChange}
            required
            rows={4}
            className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)] resize-y" 
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Author Name *" className="md:col-span-2">
            <input 
              name="authorName" 
              value={formData.authorName} 
              onChange={handleChange} 
              required
              className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]" 
            />
          </FormField>

          <FormField label="Author Role / Title">
            <input 
              name="authorRole" 
              value={formData.authorRole} 
              onChange={handleChange}
              className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]" 
            />
          </FormField>

          <FormField label="Company Name">
            <input 
              name="authorCompany" 
              value={formData.authorCompany} 
              onChange={handleChange}
              className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]" 
            />
          </FormField>
        </div>

        <div>
          <ImageUploader 
            label="Author Photo" 
            value={formData.authorPhoto} 
            onChange={(url) => setFormData(prev => ({ ...prev, authorPhoto: url }))} 
          />
        </div>

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
            onClick={() => navigate('/admin/testimonials')}
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
            {id ? 'Save Changes' : 'Add Testimonial'}
          </button>
        </div>

      </form>
    </div>
  );
}
