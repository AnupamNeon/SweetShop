import { ShoppingCart, Edit, Trash2, Package, AlertTriangle } from 'lucide-react';
import { getCategoryInfo } from '../../utils/constants';
import Button from '../common/Button';

export default function SweetCard({
  sweet,
  onPurchase,
  onEdit,
  onDelete,
  onRestock,
  isAdmin = false,
}) {
  const categoryInfo = getCategoryInfo(sweet.category);
  const isOutOfStock = sweet.quantity === 0;
  const isLowStock = sweet.quantity > 0 && sweet.quantity <= 10;

  return (
    <div className="card group bg-white border border-slate-200 hover:border-teal-200 transition-colors">
      {/* Category Badge - positioned top right */}
      <div className="relative h-2">
         <div className={`absolute top-4 left-4 ${categoryInfo.color} text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm`}>
            {categoryInfo.label}
         </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-12">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
            {sweet.name}
          </h3>
          <span className="text-xl font-bold text-slate-900">
            ${sweet.price.toFixed(2)}
          </span>
        </div>

        {sweet.description && (
          <p className="text-slate-500 text-sm mb-4 line-clamp-2 h-10">
            {sweet.description}
          </p>
        )}

        {/* Stock Status */}
        <div className="flex items-center gap-2 mb-5">
          {isOutOfStock ? (
            <div className="flex items-center gap-1.5 text-red-500 bg-red-50 px-2 py-1 rounded-md">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">Out of Stock</span>
            </div>
          ) : isLowStock ? (
            <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">Low Stock: {sweet.quantity}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
              <Package className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">In Stock: {sweet.quantity}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
          <Button
            onClick={() => onPurchase(sweet)}
            disabled={isOutOfStock}
            size="sm"
            className="flex-1"
          >
            <ShoppingCart className="w-4 h-4" />
            {isOutOfStock ? 'Sold Out' : 'Buy'}
          </Button>

          {isAdmin && (
            <>
              <button
                className="p-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                onClick={() => onRestock(sweet)}
                title="Restock"
              >
                <Package className="w-4 h-4" />
              </button>
              <button
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => onEdit(sweet)}
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => onDelete(sweet)}
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}