export default function StatusBadge({ status }) {
  const getStyles = () => {
    switch (status.toLowerCase()) {
      case 'new':
      case 'active':
      case 'published':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'contacted':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'closed':
      case 'inactive':
      case 'draft':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyles()}`}>
      {status}
    </span>
  );
}
