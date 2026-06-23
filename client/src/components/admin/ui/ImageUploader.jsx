import { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react';
import api from '../../../lib/api';
import { toast } from 'sonner';

export default function ImageUploader({ value, onChange, label = 'Upload Image' }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post('/upload', formData);
      if (response.data.success) {
        // Backend returns /uploads/filename.ext. We might need the full URL or just the path
        onChange(response.data.data.url);
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  // Helper to prepend the API base URL if the path is relative and we need to preview it
  const getPreviewUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    // Assuming VITE_API_BASE_URL points to /api, and uploads are at root level
    const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5001';
    return `${baseUrl}${url}`;
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      
      {value ? (
        <div className="relative rounded-xl border border-white/10 overflow-hidden bg-[#0a0b0e] group w-max">
          <img 
            src={getPreviewUrl(value)} 
            alt="Preview" 
            className="max-h-48 object-contain"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-500 rounded-full text-white backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div 
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
            ${isUploading ? 'border-white/10 bg-[#0a0b0e]' : 'border-white/20 hover:border-[var(--verve-accent-orange)] bg-[#13151a] hover:bg-white/5'}
          `}
        >
          {isUploading ? (
            <div className="flex flex-col items-center text-[var(--verve-accent-orange)]">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <p className="text-sm font-medium">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
              <UploadCloud className="w-8 h-8 mb-3" />
              <p className="text-sm font-medium mb-1">Click to upload image</p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
            </div>
          )}
        </div>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
