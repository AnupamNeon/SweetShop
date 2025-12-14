import { useState, useEffect } from 'react';
import { CATEGORIES } from '../../utils/constants';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';

export default function SweetForm({ sweet, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (sweet) {
      setFormData({
        name: sweet.name || '',
        category: sweet.category || '',
        price: sweet.price?.toString() || '',
        quantity: sweet.quantity?.toString() || '',
        description: sweet.description || '',
      });
    }
  }, [sweet]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.quantity && parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = {
      name: formData.name.trim(),
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity) || 0,
      description: formData.description.trim(),
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Sweet Name"
        name="name"
        placeholder="Enter sweet name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

      <Select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        options={CATEGORIES}
        placeholder="Select a category"
        error={errors.category}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price ($)"
          type="number"
          name="price"
          placeholder="0.00"
          value={formData.price}
          onChange={handleChange}
          error={errors.price}
          min="0.01"
          step="0.01"
        />

        <Input
          label="Quantity"
          type="number"
          name="quantity"
          placeholder="0"
          value={formData.quantity}
          onChange={handleChange}
          error={errors.quantity}
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          name="description"
          placeholder="Describe this sweet..."
          value={formData.description}
          onChange={handleChange}
          className="input-field min-h-[100px] resize-none"
          maxLength={500}
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.description.length}/500 characters
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" loading={loading} className="flex-1">
          {sweet ? 'Update Sweet' : 'Add Sweet'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}