import mongoose from 'mongoose';

const sweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Sweet name is required'],
      trim: true,
      unique: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: {
        values: [
          'mithai',
          'milk-sweets',
          'laddoo',
          'halwa',
          'barfi',
          'chocolate',
          'bakery',
          'namkeen',
          'ice-cream',
          'dry-fruit',
          'other'
        ],
        message: 'Invalid sweet category'
      }
    },

    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0.01, 'Price must be greater than 0']
    },

    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Text search index
sweetSchema.index({ name: 'text', category: 'text' });

const Sweet = mongoose.model('Sweet', sweetSchema);

export default Sweet;
