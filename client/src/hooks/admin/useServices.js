import { useState, useCallback } from 'react';
import api from '../../lib/api';
import { toast } from 'sonner';

export default function useServices() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/services');
      setServices(data.data || []);
    } catch (error) {
      toast.error('Failed to fetch services');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getService = useCallback(async (id) => {
    try {
      // Fetch from list and find by _id
      const { data } = await api.get('/services');
      const found = (data.data || []).find(s => s._id === id);
      return found || null;
    } catch (error) {
      toast.error('Failed to fetch service');
      return null;
    }
  }, []);

  const createService = async (payload) => {
    try {
      const { data } = await api.post('/services', payload);
      toast.success('Service created successfully');
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create service');
      throw error;
    }
  };

  const updateService = async (id, payload) => {
    try {
      const { data } = await api.put(`/services/${id}`, payload);
      toast.success('Service updated successfully');
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update service');
      throw error;
    }
  };

  const deleteService = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      setServices(prev => prev.filter(s => s._id !== id));
      toast.success('Service deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete service');
      throw error;
    }
  };

  return { services, isLoading, fetchServices, getService, createService, updateService, deleteService };
}
