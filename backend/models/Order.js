const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String },
  flavor: { type: String, default: 'Default' },
  size: { type: String, default: 'Standard' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  deliveryMethod: {
    type: String,
    enum: ['store_pickup', 'surat_express'],
    required: true,
  },
  deliveryAddress: {
    type: String,
    default: 'Store Counter Pickup (Shivashta Complex, Velanja Rd, Surat)',
  },
  items: [orderItemSchema],
  subtotal: {
    type: Number,
    required: true,
  },
  discountAmount: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  couponUsed: {
    type: String,
    default: '',
  },
  paymentMethod: {
    type: String,
    default: 'WhatsApp / UPI on Delivery',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'ready_for_pickup', 'dispatched', 'completed', 'cancelled'],
    default: 'pending',
  },
  notes: {
    type: String,
    default: '',
  },
  whatsappMessage: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
