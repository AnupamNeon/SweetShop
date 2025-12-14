import { useState } from 'react';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { getCategoryInfo } from '../../utils/constants';

export default function PurchaseModal({
  isOpen,
  onClose,
  sweet,
  onPurchase,
  loading,
}) {
  const [quantity, setQuantity] = useState(1);

  if (!sweet) return null;

  const categoryInfo = getCategoryInfo(sweet.category);
  const maxQuantity = sweet.quantity;
  const totalPrice = (sweet.price * quantity).toFixed(2);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleSubmit = () => {
    onPurchase(sweet._id, quantity);
  };

  const handleClose = () => {
    setQuantity(1);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Complete Purchase" size="sm">
      <div className="space-y-6">
        {/* Sweet Info */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className={`${categoryInfo.color} text-white p-3 rounded-xl text-2xl`}>
            {categoryInfo.label.split(' ')[0]}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">{sweet.name}</h3>
            <p className="text-sm text-gray-600">${sweet.price.toFixed(2)} each</p>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <Minus className="w-5 h-5" />
          </button>
          <div className="w-20 text-center">
            <span className="text-3xl font-bold gradient-text">{quantity}</span>
          </div>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= maxQuantity}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Stock Info */}
        <p className="text-center text-sm text-gray-500">
          {maxQuantity} available in stock
        </p>

        {/* Total */}
        <div className="text-center p-4 bg-gradient-to-r from-candy-pink/10 to-candy-purple/10 rounded-xl">
          <p className="text-sm text-gray-600 mb-1">Total Amount</p>
          <p className="text-3xl font-bold gradient-text">${totalPrice}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            loading={loading}
            className="flex-1"
          >
            <ShoppingCart className="w-4 h-4" />
            Confirm Purchase
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}