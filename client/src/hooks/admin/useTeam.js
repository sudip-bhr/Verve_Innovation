import { useState, useCallback } from 'react';
import api from '../../lib/api';
import { toast } from 'sonner';

export default function useTeam() {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTeam = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/team');
      setTeam(data.data || []);
    } catch (error) {
      toast.error('Failed to fetch team');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getMember = useCallback(async (id) => {
    try {
      // We don't have a GET /team/:id endpoint currently, 
      // so we find it from the list or we could add the endpoint
      const { data } = await api.get('/team');
      const member = data.data.find(m => m._id === id);
      return member || null;
    } catch (error) {
      toast.error('Failed to fetch member');
      return null;
    }
  }, []);

  const createMember = async (payload) => {
    try {
      const { data } = await api.post('/team', payload);
      toast.success('Team member created successfully');
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create member');
      throw error;
    }
  };

  const updateMember = async (id, payload) => {
    try {
      const { data } = await api.put(`/team/${id}`, payload);
      toast.success('Team member updated successfully');
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update member');
      throw error;
    }
  };

  const deleteMember = async (id) => {
    try {
      await api.delete(`/team/${id}`);
      setTeam(prev => prev.filter(m => m._id !== id));
      toast.success('Team member deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete member');
      throw error;
    }
  };

  return { team, isLoading, fetchTeam, getMember, createMember, updateMember, deleteMember };
}
