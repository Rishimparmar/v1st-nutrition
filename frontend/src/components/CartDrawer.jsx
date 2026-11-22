import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, MessageCircle, MapPin, Store, Truck, Tag, ShieldCheck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../api/axios';

const STORE_PHONE = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
const STORE_ADDRESS = 'Shivashta Complex, Velanja Rd, Ramvatika Society, Kathor, Velanja, Surat, Gujarat 394150';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [deliveryMethod, setDeliveryMethod] = useState('store_pickup'); // 'store_pickup' | 'surat_express'
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Delivery charge calculation
  const deliveryFee = deliveryMethod === 'surat_express' ? (subtotal > 1999 ? 0 : 99) : 0;

  // Coupon discount calculation
  let discountAmount = 0;
  if (appliedCoupon === 'SURATFIT') {
    discountAmount = Math.round(subtotal * 0.1); // 10% off
  } else if (appliedCoupon === 'V1STNEW') {
    discountAmount = Math.min(200, subtotal);
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'SURATFIT') {
      setAppliedCoupon('SURATFIT');
    } else if (code === 'V1STNEW') {
      setAppliedCoupon('V1STNEW');
    } else {
      setCouponError('Invalid coupon. Try "SURATFIT" or "V1STNEW"');
    }
  };

  const handleCheckoutWhatsApp = async () => {
    if (!cartItems.length) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your name and WhatsApp phone number.');
      return;
    }

    if (deliveryMethod === 'surat_express' && !deliveryAddress.trim()) {
      alert('Please provide your Surat delivery address (Area, Society/Building, Pincode).');
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryMethod,
      deliveryAddress:
        deliveryMethod === 'store_pickup'
          ? 'Store Counter Pickup (Shivashta Complex, Velanja Rd, Surat)'
          : deliveryAddress.trim(),
      items: cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        flavor: item.flavor || 'Standard',
        size: item.size || 'Standard',
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal,
      discountAmount,
      totalAmount: grandTotal,
      couponUsed: appliedCoupon || '',
      paymentMethod: 'UPI / Cash on Delivery',
      notes: deliveryMethod === 'store_pickup' ? 'Store Pickup within 24h' : 'Surat Express Same-Day',
    };

    try {
      // Trigger API call (with fallback handling in routes/orderRoutes)
      const res = await api.post('/orders', orderPayload);
      
      // Fire celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#34D399', '#F59E0B'],
      });

      // Open WhatsApp with pre-filled message
      if (res.data?.whatsappUrl) {
        window.open(res.data.whatsappUrl, '_blank');
      } else {
        // Direct client fallback
        const waItems = cartItems
          .map((i, idx) => `${idx + 1}. *${i.name}* (${i.flavor}, ${i.size}) x${i.quantity} = ₹${i.price * i.quantity}`)
          .join('\n');
        const text = encodeURIComponent(
          `*🏋️‍♂️ NEW V1ST ORDER*\n*Customer:* ${customerName}\n*Phone:* ${customerPhone}\n*Method:* ${
            deliveryMethod === 'store_pickup' ? 'Store Pickup (Velanja Rd)' : `Surat Delivery: ${deliveryAddress}`
          }\n\n*Items:*\n${waItems}\n\n*Total:* ₹${grandTotal} (Discount: ₹${discountAmount})\n📍 Store: ${STORE_ADDRESS}`
        );
        window.open(`https://wa.me/${STORE_PHONE}?text=${text}`, '_blank');
      }

      onClearCart();
      onClose();
    } catch (err) {
      console.warn('API error, falling back to direct WhatsApp link:', err);
      // Fallback direct WhatsApp URL
      const waItems = cartItems
        .map((i, idx) => `${idx + 1}. *${i.name}* (${i.flavor}, ${i.size}) x${i.quantity} = ₹${i.price * i.quantity}`)
        .join('\n');
      const text = encodeURIComponent(
        `*🏋️‍♂️ NEW V1ST ORDER*\n*Customer:* ${customerName}\n*Phone:* ${customerPhone}\n*Method:* ${
          deliveryMethod === 'store_pickup' ? 'Store Pickup (Velanja Rd)' : `Surat Delivery: ${deliveryAddress}`
        }\n\n*Items:*\n${waItems}\n\n*Total:* ₹${grandTotal} (Discount: ₹${discountAmount})\n📍 Store: ${STORE_ADDRESS}`
      );
      window.open(`https://wa.me/${STORE_PHONE}?text=${text}`, '_blank');
      onClearCart();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-[#121215] border-l border-white/10 h-full flex flex-col z-10 shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                  <span>Your Nutrition Bag</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </span>
                </h3>
                <span className="text-xs text-zinc-400 font-mono">
                  100% Genuine • Velanja Rd, Surat
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 text-zinc-500 font-mono text-sm">
                  Your supplement bag is empty.
                  <div className="mt-4">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs hover:bg-zinc-700 transition"
                    >
                      Browse Products
                    </button>
                  </div>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div
                    key={`${item.productId}-${item.flavor}-${item.size}-${index}`}
                    className="flex gap-4 p-4 rounded-2xl bg-zinc-900/80 border border-white/5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover bg-zinc-950 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate font-heading">
                        {item.name}
                      </h4>
                      <div className="text-[11px] font-mono text-zinc-400">
                        Flavor: <span className="text-emerald-400">{item.flavor}</span> | Size: {item.size}
                      </div>
                      <div className="text-sm font-black font-mono text-white mt-1">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => onRemoveItem(item.productId, item.flavor, item.size)}
                        className="text-zinc-500 hover:text-red-400 transition p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-lg border border-white/5">
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.flavor, item.size, item.quantity - 1)}
                          className="text-zinc-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.flavor, item.size, item.quantity + 1)}
                          className="text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer & Checkout Form */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-zinc-950/90 space-y-4">
                
                {/* Delivery Method Selection */}
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-2">
                    Select Delivery / Pickup Method:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('store_pickup')}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-semibold border transition ${
                        deliveryMethod === 'store_pickup'
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                          : 'bg-zinc-900 border-white/10 text-zinc-400'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>Store Pickup (Free)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('surat_express')}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-semibold border transition ${
                        deliveryMethod === 'surat_express'
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                          : 'bg-zinc-900 border-white/10 text-zinc-400'
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                      <span>Surat Express</span>
                    </button>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white font-mono placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp Mobile No."
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white font-mono placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {deliveryMethod === 'surat_express' && (
                    <textarea
                      placeholder="Delivery Address in Surat (Area, Society/Building, Landmark, Pincode)"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white font-mono placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
                    />
                  )}
                </div>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (SURATFIT / V1STNEW)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono uppercase text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-white/10 transition"
                  >
                    Apply
                  </button>
                </form>
                {couponError && <p className="text-[11px] text-red-400 font-mono">{couponError}</p>}
                {appliedCoupon && (
                  <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <Check className="w-3 h-3" /> Coupon "{appliedCoupon}" applied! Saved ₹{discountAmount}
                  </p>
                )}

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs font-mono border-t border-white/5 pt-3">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({appliedCoupon}):</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-400">
                    <span>Delivery:</span>
                    <span>
                      {deliveryMethod === 'store_pickup'
                        ? 'FREE (Store Pickup)'
                        : deliveryFee === 0
                        ? 'FREE (Orders > ₹1999)'
                        : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white border-t border-white/10 pt-2 font-heading">
                    <span>Total Amount:</span>
                    <span className="text-emerald-400 font-mono">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* 1-Click WhatsApp Order Button */}
                <button
                  type="button"
                  onClick={handleCheckoutWhatsApp}
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm tracking-wide shadow-volt-glow transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  <MessageCircle className="w-5 h-5 fill-black" />
                  <span>
                    {isSubmitting ? 'Generating Order...' : 'Order on WhatsApp (Instant Confirmation)'}
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
