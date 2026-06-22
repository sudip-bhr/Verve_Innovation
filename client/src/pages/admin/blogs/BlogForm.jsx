import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useBlogs from '../../../hooks/admin/useBlogs';
import FormField from '../../../components/admin/ui/FormField';
import ImageUploader from '../../../components/admin/ui/ImageUploader';
import { Loader2, ArrowLeft, Save } from 'lucide-react';

export default function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlog, createBlog, updateBlog } = useBlogs();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    author: 'Verve Team',
    tags: [],
    coverImage: '',
    isActive: true
  });

  const [tagsStr, setTagsStr] = useState('');

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        setIsLoading(true);
        const data = await getBlog(id);
        if (data) {
          setFormData(data);
          setTagsStr(data.tags?.join(', ') || '');
        } else {
          navigate('/admin/blogs');
        }
        setIsLoading(false);
      };
      loadData();
    }
  }, [id, getBlog, navigate]);

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
        tags: tagsStr.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (id) {
        await updateBlog(id, payload);
      } else {
        await createBlog(payload);
      }
      navigate('/admin/blogs');
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
          onClick={() => navigate('/admin/blogs')}
          className="p-2 bg-[#13151a] hover:bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{id ? 'Edit Blog Post' : 'New Blog Post'}</h1>
          <p className="text-gray-400 text-sm">Write your article content.</p>
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

          <FormField label="Author">
            <input 
              name="author" 
              value={formData.author} 
              onChange={handleChange}
              className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]" 
            />
          </FormField>

          <FormField label="Tags (comma separated)">
            <input 
              value={tagsStr} 
              onChange={e => setTagsStr(e.target.value)}
              placeholder="e.g. Design, Development, Tech"
              className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]" 
            />
          </FormField>
        </div>

        <FormField label="Summary / Excerpt *">
          <textarea 
            name="summary" 
            value={formData.summary} 
            onChange={handleChange}
            required
            rows={2}
            className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)] resize-y" 
          />
        </FormField>

        <FormField label="Content * (Markdown / Plain Text)">
          <textarea 
            name="content" 
            value={formData.content} 
            onChange={handleChange}
            required
            rows={12}
            className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)] resize-y font-mono text-sm" 
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
              name="isActive" 
              checked={formData.isActive} 
              onChange={handleChange} 
              className="w-4 h-4 rounded text-[var(--verve-accent-orange)] bg-[#0a0b0e] border-white/20 focus:ring-[var(--verve-accent-orange)]"
            />
            <span className="text-sm text-gray-300">Published (Visible)</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
          <button 
            type="button" 
            onClick={() => navigate('/admin/blogs')}
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
            {id ? 'Save Changes' : 'Publish Post'}
          </button>
        </div>

      </form>
    </div>
  );
}
