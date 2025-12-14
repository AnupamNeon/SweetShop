import { useState, useEffect } from 'react';
import { useSweets } from '../hooks/useSweets';
import { AlertTriangle, Package, Plus, RefreshCw } from 'lucide-react';
import Button from '../components/common/Button';
import SweetModal from '../components/sweets/SweetModal';
import RestockModal from '../components/sweets/RestockModal';
import Loading from '../components/common/Loading';

export default function AdminPage() {
  const {
    sweets,
    loading,
    fetchSweets,
    createSweet,
    updateSweet,
    deleteSweet,
    restockSweet,
    getLowStock,
  } = useSweets();

  const [lowStockItems, setLowStockItems] = useState([]);
  const [lowStockLoading, setLowStockLoading] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [showSweetModal, setShowSweetModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchSweets({ limit: 100 });
    loadLowStock();
  }, [fetchSweets]);

  const loadLowStock = async () => {
    setLowStockLoading(true);
    const result = await getLowStock(10);
    if (result.success) {
      setLowStockItems(result.data);
    }
    setLowStockLoading(false);
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
      fetchSweets({ limit: 100 });
      loadLowStock();
    }
  };

  const handleDeleteClick = async (sweet) => {
    if (window.confirm(`Are you sure you want to delete "${sweet.name}"?`)) {
      const result = await deleteSweet(sweet._id);
      if (result.success) {
        fetchSweets({ limit: 100 });
        loadLowStock();
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
      fetchSweets({ limit: 100 });
      loadLowStock();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display gradient-text">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage inventory and monitor stock levels
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={loadLowStock}>
            <RefreshCw className="w-5 h-5" />
            Refresh
          </Button>
          <Button onClick={handleAddClick}>
            <Plus className="w-5 h-5" />
            Add Sweet
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-candy-purple/20 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-candy-purple" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">{sweets.length}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-amber-600">{lowStockItems.length}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">
                {sweets.filter((s) => s.quantity === 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="glass-card p-6 mb-8 border-l-4 border-amber-500">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Low Stock Alert
          </h2>
          {lowStockLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockItems.map((sweet) => (
                <div
                  key={sweet._id}
                  className="flex items-center justify-between p-4 bg-amber-50 rounded-xl"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{sweet.name}</p>
                    <p className="text-sm text-amber-600">
                      Only {sweet.quantity} left
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleRestockClick(sweet)}
                  >
                    Restock
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* All Products Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">All Products</h2>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sweets.map((sweet) => (
                  <tr key={sweet._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-800">
                        {sweet.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-gray-600">
                        {sweet.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-800">
                        ${sweet.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          sweet.quantity === 0
                            ? 'bg-red-100 text-red-800'
                            : sweet.quantity <= 10
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {sweet.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRestockClick(sweet)}
                        >
                          Restock
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditClick(sweet)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteClick(sweet)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
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