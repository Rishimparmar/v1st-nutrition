import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ShieldCheck, Zap, MapPin, Award, CheckCircle, ArrowRight } from 'lucide-react';
import Hero3DSupplement from './Hero3DSupplement';

const HERO_FLAVORS = [
  { name: 'Double Rich Chocolate', colorHex: '#5C3317', desc: 'Imported Dutch Cocoa' },
  { name: 'Mango Alphonso (Surat Special)', colorHex: '#F59E0B', desc: 'Real Alphonso Pulp' },
  { name: 'Cookies & Cream', colorHex: '#10B981', desc: 'Emerald Crunch Edition' },
  { name: 'Malai Kulfi', colorHex: '#FBBF24', desc: 'Authentic Desi Taste' },
  { name: 'Cafe Mocha', colorHex: '#78350F', desc: 'Arabica Pre-Workout Kick' },
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
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Kinetic Labs Headline & Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Top Local Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium mb-6 w-fit backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SURAT HQ: SHIVASHTA COMPLEX, VELANJA RD
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6 font-heading">
              PURE POWER. <br />
              <span className="text-gradient-volt">ZERO COMPROMISE.</span> <br />
              <span className="text-zinc-400 text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                100% LAB TESTED.
              </span>
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
              Surat’s premier verified sports nutrition destination. Direct authorized brand imports, NABL batch-certified whey isolates, and same-day express delivery across Surat city or 15-minute store pickup.
            </p>

            {/* Interactive 3D Flavor Switcher Pills */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  Select Flavor (Controls 3D Canister):
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {activeFlavor.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {HERO_FLAVORS.map((f) => {
                  const isSelected = activeFlavor.name === f.name;
                  return (
                    <button
                      key={f.name}
                      onClick={() => setActiveFlavor(f)}
                      className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                        isSelected
                          ? 'bg-zinc-800 border-emerald-500/70 text-white shadow-volt-glow'
                          : 'bg-zinc-900/70 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-white/20 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: f.colorHex }}
                      />
                      <span>{f.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Macro Specs Grid */}
            <div className="grid grid-cols-4 gap-3 p-4 rounded-2xl glass-panel border border-white/10 mb-8 max-w-xl">
              <div className="text-center border-r border-white/10">
                <div className="text-2xl font-black font-heading text-white">27g</div>
                <div className="text-[11px] font-mono text-emerald-400">ISOLATE</div>
              </div>
              <div className="text-center border-r border-white/10">
                <div className="text-2xl font-black font-heading text-white">5.9g</div>
                <div className="text-[11px] font-mono text-amber-400">BCAAs</div>
              </div>
              <div className="text-center border-r border-white/10">
                <div className="text-2xl font-black font-heading text-white">0g</div>
                <div className="text-[11px] font-mono text-zinc-400">SUGAR</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black font-heading text-white">100%</div>
                <div className="text-[11px] font-mono text-emerald-400">NABL PASS</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleHeroWhatsAppBuy}
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-volt-glow transition-all duration-300 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-black" />
                <span>Order on WhatsApp (Instant Dispatch)</span>
              </button>

              <a
                href="#batch-verifier"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl glass-panel hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-sm border border-white/15 transition-all duration-300"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verify Batch Authenticity</span>
              </a>
            </div>

            {/* Trust Mini Strip */}
            <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-400 font-mono">
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
            transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-6 relative"
          >
            <Hero3DSupplement
              activeFlavor={activeFlavor}
              onFlavorSelect={setActiveFlavor}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
