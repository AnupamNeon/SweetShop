import { useState } from 'react';
import { Package, Minus, Plus } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import { getCategoryInfo } from '../../utils/constants';

export default function RestockModal({
  isOpen,
  onClose,
  sweet,
  onRestock,
  loading,
}) {
  const [quantity, setQuantity] = useState(10);

  if (!sweet) return null;

  const categoryInfo = getCategoryInfo(sweet.category);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleSubmit = () => {
    onRestock(sweet._id, quantity);
  };

  const handleClose = () => {
    setQuantity(10);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Restock Sweet" size="sm">
      <div className="space-y-6">
        {/* Sweet Info */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className={`${categoryInfo.color} text-white p-3 rounded-xl text-2xl`}>
            {categoryInfo.label.split(' ')[0]}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">{sweet.name}</h3>
            <p className="text-sm text-gray-600">
              Current stock: <span className="font-semibold">{sweet.quantity}</span>
            </p>
          </div>
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Add Quantity
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(-10)}
              disabled={quantity <= 10}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors text-sm font-semibold"
            >
              -10
            </button>
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="text-center text-xl font-bold"
            />
            <button
              onClick={() => handleQuantityChange(1)}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleQuantityChange(10)}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-sm font-semibold"
            >
              +10
            </button>
          </div>
        </div>

        {/* New Total */}
        <div className="text-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
          <p className="text-sm text-gray-600 mb-1">New Stock Level</p>
          <p className="text-3xl font-bold text-green-600">
            {sweet.quantity + quantity}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={handleSubmit} loading={loading} className="flex-1">
            <Package className="w-4 h-4" />
            Confirm Restock
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}