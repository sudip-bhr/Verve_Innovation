import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCases from '../../../hooks/admin/useCases';
import DataTable from '../../../components/admin/ui/DataTable';
import StatusBadge from '../../../components/admin/ui/StatusBadge';
import ConfirmDialog from '../../../components/admin/ui/ConfirmDialog';
import { Edit, Trash2, Plus, Loader2 } from 'lucide-react';

export default function CasesList() {
  const { cases, fetchCases, deleteCase, isLoading } = useCases();
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteCase(deleteId);
      setDeleteId(null);
    }
  };

  const columns = [
    {
      header: 'Title',
      accessor: 'title',
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.coverImage && (
            <img 
              src={row.coverImage.startsWith('http') || row.coverImage.startsWith('data:') ? row.coverImage : `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5001'}${row.coverImage}`} 
              alt={row.title} 
              className="w-10 h-10 rounded-md object-cover" 
            />
          )}
          <div>
            <p className="font-medium text-white">{row.title}</p>
            <p className="text-xs text-gray-400">/{row.slug}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Categories',
      accessor: 'categories',
      render: (row) => (
        <div className="flex gap-1 flex-wrap">
          {row.categories?.map((cat, i) => (
            <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded-md text-gray-300">{cat}</span>
          ))}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'isActive',
      render: (row) => <StatusBadge status={row.isActive ? 'Active' : 'Inactive'} />
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Link 
            to={`/admin/cases/${row._id}/edit`}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button 
            onClick={() => setDeleteId(row._id)}
            className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  if (isLoading && cases.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--verve-accent-orange)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Case Studies</h1>
          <p className="text-gray-400">Manage your portfolio projects.</p>
        </div>
        <Link 
          to="/admin/cases/new" 
          className="flex items-center gap-2 bg-[var(--verve-accent-orange)] hover:bg-[#d94a11] text-white px-4 py-2 rounded-lg font-medium transition-colors w-max"
        >
          <Plus className="w-4 h-4" />
          Add New
        </Link>
      </div>

      <DataTable columns={columns} data={cases} keyField="_id" />

      <ConfirmDialog 
        isOpen={!!deleteId}
        title="Delete Case Study"
        message="Are you sure you want to delete this case study? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
