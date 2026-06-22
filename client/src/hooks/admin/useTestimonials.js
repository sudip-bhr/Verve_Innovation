import { useState, useCallback } from 'react';
import api from '../../lib/api';
import { toast } from 'sonner';

export default function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/testimonials');
      setTestimonials(data.data || []);
    } catch (error) {
      toast.error('Failed to fetch testimonials');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTestimonial = useCallback(async (id) => {
    try {
      const { data } = await api.get('/testimonials');
      const testimonial = data.data.find(t => t._id === id);
      return testimonial || null;
    } catch (error) {
      toast.error('Failed to fetch testimonial');
      return null;
    }
  }, []);

  const createTestimonial = async (payload) => {
    try {
      const { data } = await api.post('/testimonials', payload);
      toast.success('Testimonial created successfully');
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create testimonial');
      throw error;
    }
  };

  const updateTestimonial = async (id, payload) => {
    try {
      const { data } = await api.put(`/testimonials/${id}`, payload);
      toast.success('Testimonial updated successfully');
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update testimonial');
      throw error;
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await api.delete(`/testimonials/${id}`);
      setTestimonials(prev => prev.filter(t => t._id !== id));
      toast.success('Testimonial deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete testimonial');
      throw error;
    }
  };

  return { testimonials, isLoading, fetchTestimonials, getTestimonial, createTestimonial, updateTestimonial, deleteTestimonial };
}
