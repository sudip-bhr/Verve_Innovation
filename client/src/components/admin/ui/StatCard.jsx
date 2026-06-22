export default function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <div className="bg-[#13151a] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-24 h-24 text-white" />
      </div>
      
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-lg bg-[var(--verve-accent-orange)]/10 text-[var(--verve-accent-orange)] flex items-center justify-center mb-4">
          <Icon className="w-5 h-5" />
        </div>
        
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <div className="flex items-end gap-3">
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
          {trend && (
            <span className={`text-sm font-medium mb-1 ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
