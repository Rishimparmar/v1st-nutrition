import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AuthenticitySection from '../components/AuthenticitySection';
import ProductCatalog from '../components/ProductCatalog';
import LocationSection from '../components/LocationSection';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { MessageCircle } from 'lucide-react';

export default function Home({
  products,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeFlavor, setActiveFlavor] = useState({
    name: 'Double Rich Chocolate',
    colorHex: '#5C3317',
    desc: 'Imported Dutch Cocoa',
  });

  const storePhone = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';

  const handleQuickWhatsAppOrder = (item) => {
    const text = encodeURIComponent(
      `Hello V1st Nutrition Surat!\nI would like to order: *${item.name}*\nFlavor: ${item.flavor}\nSize: ${item.size}\nPrice: ₹${item.price}\nPlease confirm availability for Store Pickup or Surat Express Delivery!`
    );
    window.open(`https://wa.me/${storePhone}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Navbar */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 3D Kinetic Hero Section */}
        <HeroSection
          activeFlavor={activeFlavor}
          setActiveFlavor={setActiveFlavor}
          onOpenCart={() => setIsCartOpen(true)}
          onQuickOrder={handleQuickWhatsAppOrder}
        />

        {/* 100% Authenticity & Batch Verifier */}
        <AuthenticitySection />

        {/* Product Catalog with Filters & Quick View */}
        <ProductCatalog
          products={products}
          onAddToCart={(item) => {
            onAddToCart(item);
            setIsCartOpen(true);
          }}
          onQuickWhatsAppOrder={handleQuickWhatsAppOrder}
        />

        {/* Surat Physical Showroom Location */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
        onClearCart={onClearCart}
      />

      {/* Floating WhatsApp Quick Action Button for Mobile / Desktop */}
      <a
        href={`https://wa.me/${storePhone}?text=${encodeURIComponent(
          'Hello V1st Nutrition Surat! I have a question about supplement authenticity and stock.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-volt-glow transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-black" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-mono text-xs font-bold pl-0 group-hover:pl-2">
          Surat Store WhatsApp
        </span>
      </a>
    </div>
  );
}
