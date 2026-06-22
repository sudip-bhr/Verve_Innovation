import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useServices from '../../../hooks/admin/useServices';
import DataTable from '../../../components/admin/ui/DataTable';
import StatusBadge from '../../../components/admin/ui/StatusBadge';
import ConfirmDialog from '../../../components/admin/ui/ConfirmDialog';
import { Edit, Trash2, Plus, Loader2 } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function ServicesList() {
  const { services, fetchServices, deleteService, isLoading } = useServices();
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteService(deleteId);
      setDeleteId(null);
    }
  };

  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.LayoutGrid;
    return <IconComponent className="w-5 h-5 text-[var(--verve-accent-orange)]" />;
  };

  const columns = [
    {
      header: 'Service',
      accessor: 'title',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg shrink-0">
            {renderIcon(row.icon)}
          </div>
          <div>
            <p className="font-medium text-white">{row.title}</p>
            <p className="text-xs text-gray-400">/{row.slug}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Description',
      accessor: 'shortDescription',
      render: (row) => (
        <p className="text-gray-400 text-sm max-w-xs truncate">
          {row.shortDescription}
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
            to={`/admin/services/${row._id}/edit`}
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

  if (isLoading && services.length === 0) {
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
          <h1 className="text-2xl font-bold text-white mb-1">Services</h1>
          <p className="text-gray-400">Manage your company services.</p>
        </div>
        <Link 
          to="/admin/services/new" 
          className="flex items-center gap-2 bg-[var(--verve-accent-orange)] hover:bg-[#d94a11] text-white px-4 py-2 rounded-lg font-medium transition-colors w-max"
        >
          <Plus className="w-4 h-4" />
          Add New
        </Link>
      </div>

      <DataTable columns={columns} data={services} keyField="_id" />

      <ConfirmDialog 
        isOpen={!!deleteId}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
