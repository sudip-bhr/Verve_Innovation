import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useTeam from '../../../hooks/admin/useTeam';
import DataTable from '../../../components/admin/ui/DataTable';
import StatusBadge from '../../../components/admin/ui/StatusBadge';
import ConfirmDialog from '../../../components/admin/ui/ConfirmDialog';
import { Edit, Trash2, Plus, Loader2, User } from 'lucide-react';

export default function TeamList() {
  const { team, fetchTeam, deleteMember, isLoading } = useTeam();
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteMember(deleteId);
      setDeleteId(null);
    }
  };

  const columns = [
    {
      header: 'Member',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.photo ? (
            <img 
              src={row.photo.startsWith('http') || row.photo.startsWith('data:') ? row.photo : `http://localhost:5001${row.photo}`} 
              alt={row.name} 
              className="w-10 h-10 rounded-full object-cover border border-white/10" 
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
              <User className="w-5 h-5" />
            </div>
          )}
          <div>
            <p className="font-medium text-white">{row.name}</p>
            <p className="text-xs text-gray-400">{row.role}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Tagline',
      accessor: 'tagline',
      render: (row) => (
        <p className="text-gray-400 text-sm max-w-xs truncate">
          {row.tagline || '-'}
        </p>
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
            to={`/admin/team/${row._id}/edit`}
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

  if (isLoading && team.length === 0) {
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
          <h1 className="text-2xl font-bold text-white mb-1">Team</h1>
          <p className="text-gray-400">Manage your company team members.</p>
        </div>
        <Link 
          to="/admin/team/new" 
          className="flex items-center gap-2 bg-[var(--verve-accent-orange)] hover:bg-[#d94a11] text-white px-4 py-2 rounded-lg font-medium transition-colors w-max"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </Link>
      </div>

      <DataTable columns={columns} data={team} keyField="_id" />

      <ConfirmDialog 
        isOpen={!!deleteId}
        title="Delete Team Member"
        message="Are you sure you want to delete this member? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
