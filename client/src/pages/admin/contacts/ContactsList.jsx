import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useContacts from '../../../hooks/admin/useContacts';
import DataTable from '../../../components/admin/ui/DataTable';
import StatusBadge from '../../../components/admin/ui/StatusBadge';
import ConfirmDialog from '../../../components/admin/ui/ConfirmDialog';
import { Trash2, Eye, Loader2 } from 'lucide-react';

export default function ContactsList() {
  const { contacts, fetchContacts, deleteContact, isLoading } = useContacts();
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteContact(deleteId);
      setDeleteId(null);
    }
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'firstName',
      render: (row) => (
        <div>
          <p className="font-medium text-white">{row.firstName} {row.lastName}</p>
          <p className="text-xs text-gray-400">{row.email}</p>
        </div>
      )
    },
    {
      header: 'Project Type',
      accessor: 'projectType',
      render: (row) => (
        <span className="text-sm text-gray-300">{row.projectType || '-'}</span>
      )
    },
    {
      header: 'Date',
      accessor: 'createdAt',
      render: (row) => (
        <span className="text-sm text-gray-400">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Link 
            to={`/admin/contacts/${row._id}`}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors"
          >
            <Eye className="w-4 h-4" />
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

  if (isLoading && contacts.length === 0) {
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
          <h1 className="text-2xl font-bold text-white mb-1">Contacts</h1>
          <p className="text-gray-400">Manage client inquiries and messages.</p>
        </div>
      </div>

      <DataTable columns={columns} data={contacts} keyField="_id" />

      <ConfirmDialog 
        isOpen={!!deleteId}
        title="Delete Contact"
        message="Are you sure you want to delete this inquiry? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
