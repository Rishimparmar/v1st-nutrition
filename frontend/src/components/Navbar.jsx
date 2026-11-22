import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, MessageCircle, ShieldCheck, MapPin, Menu, X, User } from 'lucide-react';

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const storePhone = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#09090B]/80 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:shadow-volt-glow transition duration-300">
            <span className="font-heading font-black text-xl tracking-tighter">V1</span>
          </div>
          <div>
            <span className="font-heading font-black text-xl tracking-tight text-white block leading-none">
              V1ST <span className="text-emerald-400">NUTRITION</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mt-0.5">
              VELANJA RD • SURAT
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-zinc-300">
          <a href="#" className="hover:text-emerald-400 transition">
            3D LAB
          </a>
          <a href="#batch-verifier" className="hover:text-emerald-400 transition flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            AUTHENTICITY
          </a>
          <a href="#catalog" className="hover:text-emerald-400 transition">
            SUPPLEMENTS
          </a>
          <a href="#location" className="hover:text-emerald-400 transition flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            SURAT STORE
          </a>
          <Link to="/admin" className="hover:text-emerald-400 transition flex items-center gap-1 text-zinc-400">
            <User className="w-3 h-3" />
            ADMIN
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/${storePhone}?text=${encodeURIComponent(
              'Hello V1st Nutrition Surat! I need advice on choosing the right protein/creatine stack.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black font-semibold text-xs transition duration-300 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Surat WhatsApp</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-white border border-white/10 transition active:scale-95"
            title="Open Bag"
          >
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-black text-[11px] font-mono font-bold flex items-center justify-center shadow-volt-glow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-white/10 px-6 py-6 space-y-4 font-mono text-sm">
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 hover:text-emerald-400"
          >
            ✦ 3D Kinetic Lab
          </a>
          <a
            href="#batch-verifier"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 hover:text-emerald-400"
          >
            ✦ Authenticity & Batch Verifier
          </a>
          <a
            href="#catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 hover:text-emerald-400"
          >
            ✦ Supplements Catalog
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 hover:text-emerald-400"
          >
            ✦ Visit Surat Showroom
          </a>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-400 hover:text-emerald-400"
          >
            ✦ Admin Dashboard Portal
          </Link>
        </div>
      )}
    </header>
  );
}
