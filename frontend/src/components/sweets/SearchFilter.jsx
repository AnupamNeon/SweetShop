import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';

export default function SearchFilter({ onSearch, onClear }) {
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );
    onSearch(activeFilters);
  };

  const handleClear = () => {
    setFilters({
      name: '',
      category: '',
      minPrice: '',
      maxPrice: '',
    });
    onClear();
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            name="name"
            placeholder="Search sweets..."
            value={filters.name}
            onChange={handleChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-12"
          />
        </div>

        {/* Filter Toggle */}
        <Button
          variant="secondary"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-candy-pink rounded-full" />
          )}
        </Button>

        {/* Search & Clear Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleSearch}>
            Search
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" onClick={handleClear}>
              <X className="w-4 h-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
          <Select
            name="category"
            value={filters.category}
            onChange={handleChange}
            options={CATEGORIES}
            placeholder="All Categories"
          />
          <Input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
          <Input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>
      )}
    </div>
  );
}