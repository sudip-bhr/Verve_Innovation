import { useState, useCallback } from 'react';
import api from '../../lib/api';
import { toast } from 'sonner';

export default function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/blogs');
      setBlogs(data.data || []);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getBlog = useCallback(async (id) => {
    try {
      // Fetch from list and find by _id
      const { data } = await api.get('/blogs');
      const found = (data.data || []).find(b => b._id === id);
      return found || null;
    } catch (error) {
      toast.error('Failed to fetch blog');
      return null;
    }
  }, []);

  const createBlog = async (payload) => {
    try {
      const { data } = await api.post('/blogs', payload);
      toast.success('Blog post created successfully');
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create blog');
      throw error;
    }
  };

  const updateBlog = async (id, payload) => {
    try {
      const { data } = await api.put(`/blogs/${id}`, payload);
      toast.success('Blog post updated successfully');
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update blog');
      throw error;
    }
  };

  const deleteBlog = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(prev => prev.filter(b => b._id !== id));
      toast.success('Blog post deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete blog');
      throw error;
    }
  };

  return { blogs, isLoading, fetchBlogs, getBlog, createBlog, updateBlog, deleteBlog };
}
