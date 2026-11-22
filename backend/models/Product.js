const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Whey Protein', 'Isolates', 'Creatine & Pre-Workout', 'Mass Gainers', 'Vitamins & Health', 'Accessories'],
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: String,
    default: '15% OFF',
  },
  rating: {
    type: Number,
    default: 4.8,
  },
  reviewCount: {
    type: Number,
    default: 120,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  stockCount: {
    type: Number,
    default: 25,
  },
  flavors: [
    {
      name: { type: String, required: true },
      colorHex: { type: String, default: '#10B981' },
      inStock: { type: Boolean, default: true },
    }
  ],
  sizes: [
    { type: String, default: '1 kg (2.2 lbs)' }
  ],
  proteinPerScoop: {
    type: String,
    default: '25g',
  },
  bcaaPerScoop: {
    type: String,
    default: '5.5g',
  },
  servings: {
    type: Number,
    default: 30,
  },
  fssaiNumber: {
    type: String,
    default: '10723026000412',
  },
  batchCode: {
    type: String,
    required: true,
  },
  labReportUrl: {
    type: String,
    default: 'https://v1stnutrition.com/reports/verified-purity.pdf',
  },
  description: {
    type: String,
    required: true,
  },
  keyBenefits: [
    { type: String }
  ],
  image: {
    type: String,
    required: true,
  },
  tags: [
    { type: String }
  ],
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
