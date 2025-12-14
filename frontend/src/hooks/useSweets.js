import { useState, useCallback } from 'react';
import { sweetsAPI, inventoryAPI } from '../services/api';
import toast from 'react-hot-toast';

export function useSweets() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  const fetchSweets = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await sweetsAPI.getAll(params);
      setSweets(response.data.data);
      setPagination({
        page: response.data.page,
        pages: response.data.pages,
        total: response.data.total,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch sweets');
      toast.error('Failed to load sweets');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchSweets = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await sweetsAPI.search(params);
      setSweets(response.data.data);
      setPagination({
        page: 1,
        pages: 1,
        total: response.data.count,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const createSweet = async (data) => {
    try {
      const response = await sweetsAPI.create(data);
      toast.success('Sweet created successfully! 🍭');
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create sweet';
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateSweet = async (id, data) => {
    try {
      const response = await sweetsAPI.update(id, data);
      toast.success('Sweet updated successfully! ✨');
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update sweet';
      toast.error(message);
      return { success: false, message };
    }
  };

  const deleteSweet = async (id) => {
    try {
      await sweetsAPI.delete(id);
      toast.success('Sweet deleted successfully!');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete sweet';
      toast.error(message);
      return { success: false, message };
    }
  };

  const purchaseSweet = async (id, quantity) => {
    try {
      const response = await inventoryAPI.purchase(id, quantity);
      toast.success('Purchase successful! 🛒');
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Purchase failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const restockSweet = async (id, quantity) => {
    try {
      const response = await inventoryAPI.restock(id, quantity);
      toast.success('Restock successful! 📦');
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Restock failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const getLowStock = async (threshold = 10) => {
    try {
      const response = await inventoryAPI.getLowStock(threshold);
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to get low stock items';
      toast.error(message);
      return { success: false, message };
    }
  };

  return {
    sweets,
    loading,
    error,
    pagination,
    fetchSweets,
    searchSweets,
    createSweet,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet,
    getLowStock,
  };
}