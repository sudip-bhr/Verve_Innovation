import { useState, useCallback } from 'react';
import api from '../../lib/api';
import { toast } from 'sonner';

export default function useCases() {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCases = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/cases');
      setCases(data.data || []);
    } catch (error) {
      toast.error('Failed to fetch cases');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCase = useCallback(async (id) => {
    try {
      // Fetch from list and find by _id (no dedicated GET /cases/:id endpoint)
      const { data } = await api.get('/cases');
      const found = (data.data || []).find(c => c._id === id);
      return found || null;
    } catch (error) {
      toast.error('Failed to fetch case');
      return null;
    }
  }, []);

  const createCase = async (payload) => {
    try {
      const { data } = await api.post('/cases', payload);
      toast.success('Case created successfully');
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create case');
      throw error;
    }
  };

  const updateCase = async (id, payload) => {
    try {
      const { data } = await api.put(`/cases/${id}`, payload);
      toast.success('Case updated successfully');
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update case');
      throw error;
    }
  };

  const deleteCase = async (id) => {
    try {
      await api.delete(`/cases/${id}`);
      setCases(prev => prev.filter(c => c._id !== id));
      toast.success('Case deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete case');
      throw error;
    }
  };

  return { cases, isLoading, fetchCases, getCase, createCase, updateCase, deleteCase };
}
