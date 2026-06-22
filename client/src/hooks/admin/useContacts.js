import { useState, useCallback } from 'react';
import api from '../../lib/api';
import { toast } from 'sonner';

export default function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/contact');
      setContacts(data.data || []);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getContact = useCallback(async (id) => {
    try {
      // We don't have a GET /contact/:id endpoint currently, 
      // so we find it from the list or we could add the endpoint
      const { data } = await api.get('/contact');
      const contact = data.data.find(c => c._id === id);
      return contact || null;
    } catch (error) {
      toast.error('Failed to fetch contact');
      return null;
    }
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.patch(`/contact/${id}/status`, { status });
      toast.success('Contact status updated');
      setContacts(prev => prev.map(c => c._id === id ? { ...c, status } : c));
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
      throw error;
    }
  };

  const deleteContact = async (id) => {
    try {
      await api.delete(`/contact/${id}`);
      setContacts(prev => prev.filter(c => c._id !== id));
      toast.success('Contact deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete contact');
      throw error;
    }
  };

  return { contacts, isLoading, fetchContacts, getContact, updateStatus, deleteContact };
}
