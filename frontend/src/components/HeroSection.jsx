import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ShieldCheck, Zap, MapPin, Award, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import Hero3DSupplement from './Hero3DSupplement';

const HERO_FLAVORS = [
  { name: 'Double Rich Chocolate', colorHex: '#5C3317', desc: 'Imported Dutch Cocoa' },
  { name: 'Mango Alphonso (Surat Special)', colorHex: '#F59E0B', desc: 'Real Alphonso Pulp' },
  { name: 'Cookies & Cream', colorHex: '#10B981', desc: 'Emerald Crunch Edition' },
  { name: 'Malai Kulfi', colorHex: '#FBBF24', desc: 'Authentic Desi Taste' },
  { name: 'Cafe Mocha', colorHex: '#78350F', desc: 'Arabica Pre-Workout Kick' },
];

const MARQUEE_ITEMS = [
  '100% NABL LAB VERIFIED',
  'ZERO AMINO SPIKING',
  'AUTHORIZED IMPORTERS',
  'SHIVASHTA COMPLEX VELANJA RD SURAT',
  'SAME-DAY SURAT EXPRESS DISPATCH',
  'FSSAI LIC. 10723026000412',
];

export default function HeroSection({
  activeFlavor,
  setActiveFlavor,
  onOpenCart,
  onQuickOrder,
}) {
  const storePhone = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';

  const handleHeroWhatsAppBuy = () => {
    const text = encodeURIComponent(
      `Hello V1st Nutrition Surat!\nI would like to order the flagship *V1st Ultra-Pure 100% Whey Isolate* (Flavor: ${activeFlavor.name}).\nPlease let me know the availability and payment options for Store Pickup / Surat Express Delivery.`
    );
    window.open(`https://wa.me/${storePhone}?text=${text}`, '_blank');
  };

  return (
    <section className="relative pt-24 pb-0 lg:pt-32 overflow-hidden">
      {/* Background radial emerald ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16 lg:pb-24">
        {/* Balanced Grid: 7 cols for Text, 5 cols for 3D Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Kinetic Labs Headline & Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center"
          >
            {/* Top Local Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/35 text-emerald-400 text-xs font-mono font-medium mb-5 w-fit backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SURAT HQ: SHIVASHTA COMPLEX, VELANJA RD
            </div>

            {/* Main Headline (Proportionate, no overflow) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[48px] font-black tracking-tight leading-[1.08] mb-6 font-heading">
              PURE POWER. <br />
              <span className="text-gradient-volt inline-block">ZERO COMPROMISE.</span> <br />
              <span className="text-zinc-400 text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-extrabold inline-block mt-1">
                100% LAB TESTED.
              </span>
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base lg:text-base mb-8 leading-relaxed max-w-lg font-body">
              Surat’s premier verified sports nutrition destination. Direct authorized brand imports, NABL batch-certified whey isolates, and same-day express delivery across Surat city or 15-minute store pickup.
            </p>

            {/* Interactive 3D Flavor Switcher Pills */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3 max-w-lg">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  Select Flavor (Syncs with 3D Canister):
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {activeFlavor.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 max-w-lg">
                {HERO_FLAVORS.map((f) => {
                  const isSelected = activeFlavor.name === f.name;
                  return (
                    <button
                      key={f.name}
                      onClick={() => setActiveFlavor(f)}
                      className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                        isSelected
                          ? 'bg-zinc-800 border-emerald-500/70 text-white shadow-volt-glow'
                          : 'bg-zinc-900/70 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white/20 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: f.colorHex }}
                      />
                      <span>{f.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Macro Specs Grid */}
            <div className="grid grid-cols-4 gap-3 p-3.5 rounded-2xl glass-panel-elevated mb-8 max-w-lg">
              <div className="text-center border-r border-white/10">
                <div className="text-xl sm:text-2xl font-black font-heading text-white">27g</div>
                <div className="text-[10px] sm:text-[11px] font-mono text-emerald-400">ISOLATE</div>
              </div>
              <div className="text-center border-r border-white/10">
                <div className="text-xl sm:text-2xl font-black font-heading text-white">5.9g</div>
                <div className="text-[10px] sm:text-[11px] font-mono text-amber-400">BCAAs</div>
              </div>
              <div className="text-center border-r border-white/10">
                <div className="text-xl sm:text-2xl font-black font-heading text-white">0g</div>
                <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400">SUGAR</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-black font-heading text-white">100%</div>
                <div className="text-[10px] sm:text-[11px] font-mono text-emerald-400">NABL PASS</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-lg">
              <button
                onClick={handleHeroWhatsAppBuy}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm shadow-volt-glow transition-all duration-300 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Order on WhatsApp (Instant Dispatch)</span>
              </button>

              <a
                href="#batch-verifier"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl glass-panel hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all duration-300"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verify Batch Authenticity</span>
              </a>
            </div>

            {/* Trust Mini Strip */}
            <div className="mt-7 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                FSSAI Lic. 10723026000412
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Velanja Store Pickup Ready
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Zero Fake Guarantee
              </span>
            </div>
          </motion.div>

          {/* Right Column: 3D Supplement Hero Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 relative"
          >
            <Hero3DSupplement
              activeFlavor={activeFlavor}
              onFlavorSelect={setActiveFlavor}
            />
          </motion.div>

        </div>
      </div>

      {/* Smooth Infinite Horizontal Marquee Strip */}
      <div className="w-full border-t border-b border-white/10 bg-[#0E0E12] py-3.5 overflow-hidden relative select-none">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#09090B] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#09090B] to-transparent z-10 pointer-events-none" />
        
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs font-mono font-bold tracking-widest uppercase">
          {MARQUEE_ITEMS.map((item, idx) => (
            <div key={`m1-${idx}`} className="flex items-center gap-8">
              <span className="text-zinc-300 hover:text-emerald-400 transition-colors cursor-default">
                {item}
              </span>
              <span className="text-emerald-500/60 text-sm">✦</span>
            </div>
          ))}
          {MARQUEE_ITEMS.map((item, idx) => (
            <div key={`m2-${idx}`} className="flex items-center gap-8">
              <span className="text-zinc-300 hover:text-emerald-400 transition-colors cursor-default">
                {item}
              </span>
              <span className="text-emerald-500/60 text-sm">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
