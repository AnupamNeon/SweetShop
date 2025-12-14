import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSweets } from '../hooks/useSweets';
import SearchFilter from '../components/sweets/SearchFilter';
import SweetList from '../components/sweets/SweetList';
import PurchaseModal from '../components/sweets/PurchaseModal';
import SweetModal from '../components/sweets/SweetModal';
import RestockModal from '../components/sweets/RestockModal';
import Button from '../components/common/Button';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DashboardPage() {
  const { isAdmin } = useAuth();
  const {
    sweets,
    loading,
    pagination,
    fetchSweets,
    searchSweets,
    createSweet,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet,
  } = useSweets();

  const [selectedSweet, setSelectedSweet] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showSweetModal, setShowSweetModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});

  useEffect(() => {
    fetchSweets({ page: 1, limit: 12 });
  }, [fetchSweets]);

  const handleSearch = useCallback((filters) => {
    setCurrentFilters(filters);
    if (Object.keys(filters).length > 0) {
      searchSweets(filters);
    } else {
      fetchSweets({ page: 1, limit: 12 });
    }
  }, [searchSweets, fetchSweets]);

  const handleClearSearch = useCallback(() => {
    setCurrentFilters({});
    fetchSweets({ page: 1, limit: 12 });
  }, [fetchSweets]);

  const handlePageChange = (newPage) => {
    fetchSweets({ page: newPage, limit: 12 });
  };

  const handlePurchaseClick = (sweet) => {
    setSelectedSweet(sweet);
    setShowPurchaseModal(true);
  };

  const handlePurchase = async (sweetId, quantity) => {
    setActionLoading(true);
    const result = await purchaseSweet(sweetId, quantity);
    setActionLoading(false);
    if (result.success) {
      setShowPurchaseModal(false);
      setSelectedSweet(null);
      fetchSweets({ page: pagination.page, limit: 12 });
    }
  };

  const handleAddClick = () => {
    setSelectedSweet(null);
    setIsEditing(false);
    setShowSweetModal(true);
  };

  const handleEditClick = (sweet) => {
    setSelectedSweet(sweet);
    setIsEditing(true);
    setShowSweetModal(true);
  };

  const handleSweetSubmit = async (data) => {
    setActionLoading(true);
    let result;
    if (isEditing && selectedSweet) {
      result = await updateSweet(selectedSweet._id, data);
    } else {
      result = await createSweet(data);
    }
    setActionLoading(false);
    if (result.success) {
      setShowSweetModal(false);
      setSelectedSweet(null);
      fetchSweets({ page: pagination.page, limit: 12 });
    }
  };

  const handleDeleteClick = async (sweet) => {
    if (window.confirm(`Are you sure you want to delete "${sweet.name}"?`)) {
      const result = await deleteSweet(sweet._id);
      if (result.success) {
        fetchSweets({ page: pagination.page, limit: 12 });
      }
    }
  };

  const handleRestockClick = (sweet) => {
    setSelectedSweet(sweet);
    setShowRestockModal(true);
  };

  const handleRestock = async (sweetId, quantity) => {
    setActionLoading(true);
    const result = await restockSweet(sweetId, quantity);
    setActionLoading(false);
    if (result.success) {
      setShowRestockModal(false);
      setSelectedSweet(null);
      fetchSweets({ page: pagination.page, limit: 12 });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display gradient-text">
            Sweet Shop
          </h1>
          <p className="text-gray-600 mt-1">
            Browse our delicious selection of treats
          </p>
        </div>
        {isAdmin && (
          <Button onClick={handleAddClick}>
            <Plus className="w-5 h-5" />
            Add New Sweet
          </Button>
        )}
      </div>

      {/* Search & Filter */}
      <SearchFilter onSearch={handleSearch} onClear={handleClearSearch} />

      {/* Sweet List */}
      <SweetList
        sweets={sweets}
        loading={loading}
        onPurchase={handlePurchaseClick}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onRestock={handleRestockClick}
        isAdmin={isAdmin}
      />

      {/* Pagination */}
      {pagination.pages > 1 && Object.keys(currentFilters).length === 0 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="secondary"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </Button>
          <span className="text-gray-600">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="secondary"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.pages}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Modals */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => {
          setShowPurchaseModal(false);
          setSelectedSweet(null);
        }}
        sweet={selectedSweet}
        onPurchase={handlePurchase}
        loading={actionLoading}
      />

      <SweetModal
        isOpen={showSweetModal}
        onClose={() => {
          setShowSweetModal(false);
          setSelectedSweet(null);
        }}
        sweet={isEditing ? selectedSweet : null}
        onSubmit={handleSweetSubmit}
        loading={actionLoading}
      />

      <RestockModal
        isOpen={showRestockModal}
        onClose={() => {
          setShowRestockModal(false);
          setSelectedSweet(null);
        }}
        sweet={selectedSweet}
        onRestock={handleRestock}
        loading={actionLoading}
      />
    </div>
  );
}