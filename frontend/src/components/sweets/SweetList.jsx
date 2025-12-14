import SweetCard from './SweetCard';
import Loading from '../common/Loading';
import { Frown } from 'lucide-react';

export default function SweetList({
  sweets,
  loading,
  onPurchase,
  onEdit,
  onDelete,
  onRestock,
  isAdmin,
}) {
  if (loading) {
    return <Loading />;
  }

  if (!sweets || sweets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <Frown className="w-16 h-16 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No sweets found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sweets.map((sweet) => (
        <SweetCard
          key={sweet._id}
          sweet={sweet}
          onPurchase={onPurchase}
          onEdit={onEdit}
          onDelete={onDelete}
          onRestock={onRestock}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
}