import { useEffect, useState } from 'react';
import useStats from '../../../hooks/admin/useStats';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function StatsEditor() {
  const { stats, fetchStats, updateStats, isLoading } = useStats();
  const [formData, setFormData] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    if (stats.length > 0) {
      // Create a local copy to edit
      setFormData(stats.map(s => ({
        key: s.key,
        value: s.value,
        suffix: s.suffix || '',
        label: s.label
      })));
    }
  }, [stats]);

  const handleChange = (index, field, val) => {
    const updated = [...formData];
    if (field === 'value') {
      updated[index][field] = Number(val);
    } else {
      updated[index][field] = val;
    }
    setFormData(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateStats(formData);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading && formData.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--verve-accent-orange)]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Company Stats</h1>
          <p className="text-gray-400">Update the metrics shown on the website.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[var(--verve-accent-orange)] hover:bg-[#d94a11] text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-70"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="bg-[#13151a] border border-white/10 rounded-xl overflow-hidden p-6">
        {formData.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No stats found. Please seed the database first.</p>
        ) : (
          <div className="space-y-6">
            {formData.map((stat, idx) => (
              <div key={stat.key} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border-b border-white/5 pb-6 last:border-0 last:pb-0">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Key (Internal)</label>
                  <input 
                    type="text" 
                    value={stat.key} 
                    disabled 
                    className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-gray-500 cursor-not-allowed" 
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Value (Number)</label>
                  <input 
                    type="number" 
                    value={stat.value}
                    onChange={(e) => handleChange(idx, 'value', e.target.value)}
                    className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]" 
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Suffix (e.g. + or %)</label>
                  <input 
                    type="text" 
                    value={stat.suffix}
                    onChange={(e) => handleChange(idx, 'suffix', e.target.value)}
                    className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]" 
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Label</label>
                  <input 
                    type="text" 
                    value={stat.label}
                    onChange={(e) => handleChange(idx, 'label', e.target.value)}
                    className="w-full bg-[#0a0b0e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--verve-accent-orange)]" 
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
