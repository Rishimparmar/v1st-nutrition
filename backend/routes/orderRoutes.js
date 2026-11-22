const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');

const STORE_PHONE = process.env.STORE_PHONE || '+919876543210';
const STORE_ADDRESS = 'Shivashta Complex, Velanja Rd, Ramvatika Society, Kathor, Velanja, Surat, Gujarat 394150';

// Helper to format WhatsApp message
const generateWhatsAppLink = (order) => {
  const cleanPhone = STORE_PHONE.replace(/[^0-9]/g, '');
  const deliveryText = order.deliveryMethod === 'store_pickup'
    ? '🏪 *Store Pickup (Velanja Rd, Surat)*'
    : `🚚 *Surat Express Delivery* to:\n${order.deliveryAddress}`;

  let itemsList = '';
  order.items.forEach((item, index) => {
    itemsList += `${index + 1}. *${item.name}*\n   Flavor: ${item.flavor} | Size: ${item.size}\n   Qty: ${item.quantity} x ₹${item.price} = ₹${item.quantity * item.price}\n`;
  });

  const rawMessage = `*🏋️‍♂️ NEW ORDER: ${order.orderId}*\n*Store:* V1st Nutrition, Surat\n---------------------------------\n*Customer:* ${order.customerName}\n*Phone:* ${order.customerPhone}\n*Method:* ${deliveryText}\n\n*Items Ordered:*\n${itemsList}---------------------------------\n*Subtotal:* ₹${order.subtotal}\n*Discount:* ₹${order.discountAmount} ${order.couponUsed ? `(${order.couponUsed})` : ''}\n*Grand Total:* ₹${order.totalAmount}\n*Payment:* ${order.paymentMethod}\n${order.notes ? `*Notes:* ${order.notes}\n` : ''}\n📍 *Store Location:* ${STORE_ADDRESS}\nThank you for choosing V1st Nutrition! 100% Authentic & Lab Tested.`;

  return {
    rawMessage,
    url: `https://wa.me/${cleanPhone}?text=${encodeURIComponent(rawMessage)}`,
  };
};

// @route   POST /api/orders
// @desc    Create new order + generate WhatsApp automation URL
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      deliveryMethod,
      deliveryAddress,
      items,
      subtotal,
      discountAmount,
      totalAmount,
      couponUsed,
      paymentMethod,
      notes,
    } = req.body;

    if (!customerName || !customerPhone || !items || !items.length) {
      return res.status(400).json({ message: 'Customer name, phone, and items are required' });
    }

    const orderId = `V1ST-${Date.now().toString().slice(-6)}`;
    const tempOrder = {
      orderId,
      customerName,
      customerPhone,
      deliveryMethod: deliveryMethod || 'store_pickup',
      deliveryAddress: deliveryAddress || 'Store Pickup (Velanja Rd, Surat)',
      items,
      subtotal: subtotal || totalAmount,
      discountAmount: discountAmount || 0,
      totalAmount,
      couponUsed: couponUsed || '',
      paymentMethod: paymentMethod || 'UPI / Cash on Delivery',
      notes: notes || '',
    };

    const { rawMessage, url } = generateWhatsAppLink(tempOrder);

    let savedOrder;
    try {
      const order = new Order({
        ...tempOrder,
        whatsappMessage: rawMessage,
      });
      savedOrder = await order.save();
    } catch (dbErr) {
      // In case MongoDB is offline or in mock mode, return order object directly
      console.warn('DB Save fallback in Order Routes:', dbErr.message);
      savedOrder = {
        _id: 'mock-' + Date.now(),
        ...tempOrder,
        whatsappMessage: rawMessage,
        createdAt: new Date(),
      };
    }

    res.status(201).json({
      success: true,
      order: savedOrder,
      whatsappUrl: url,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error processing order' });
  }
});

// @route   GET /api/orders
// @desc    Get all orders (Admin protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving orders' });
  }
});

// @route   PATCH /api/orders/:id/status
// @desc    Update order status (Admin protected)
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update order status' });
  }
});

module.exports = router;
