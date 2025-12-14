export const CATEGORIES = [
  { value: 'mithai', label: '🍬 Mithai', color: 'bg-amber-600' },
  { value: 'milk-sweets', label: '🥛 Milk Sweets', color: 'bg-white border-2' },
  { value: 'laddoo', label: '🟡 Laddoo', color: 'bg-yellow-500' },
  { value: 'halwa', label: '🍮 Halwa', color: 'bg-orange-500' },
  { value: 'barfi', label: '🔷 Barfi', color: 'bg-slate-300' },
  { value: 'chocolate', label: '🍫 Chocolate', color: 'bg-stone-700' },
  { value: 'bakery', label: '🥐 Bakery', color: 'bg-amber-400' },
  { value: 'namkeen', label: '🥨 Namkeen', color: 'bg-yellow-600' },
  { value: 'ice-cream', label: '🍦 Ice Cream', color: 'bg-sky-400' },
  { value: 'dry-fruit', label: '🥜 Dry Fruit', color: 'bg-amber-700' },
  { value: 'other', label: '🍭 Other', color: 'bg-indigo-500' },
];

export const getCategoryInfo = (categoryValue) => {
  return CATEGORIES.find(cat => cat.value === categoryValue) || CATEGORIES[6];
};

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';