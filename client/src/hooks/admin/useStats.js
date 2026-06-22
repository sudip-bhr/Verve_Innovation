import { useState, useCallback } from 'react';
import api from '../../lib/api';
import { toast } from 'sonner';

export default function useStats() {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/stats');
      setStats(data.data || []);
    } catch (error) {
      toast.error('Failed to fetch stats');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStats = async (payload) => {
    try {
      // payload is an array of stats
      const { data } = await api.put('/stats', { stats: payload });
      toast.success('Stats updated successfully');
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update stats');
      throw error;
    }
  };

  return { stats, isLoading, fetchStats, updateStats };
}
