import React from 'react';
import { MapPin, Phone, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#09090B] border-t border-white/10 text-zinc-400 text-xs font-mono pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Partnerships Strip */}
        <div className="pb-12 mb-12 border-b border-white/5 flex flex-wrap items-center justify-between gap-6 text-zinc-500 text-sm tracking-wider uppercase">
          <span className="text-zinc-400 font-bold">Authorized Brands:</span>
          <span>Optimum Nutrition</span>
          <span>•</span>
          <span>MuscleBlaze</span>
          <span>•</span>
          <span>Dymatize</span>
          <span>•</span>
          <span>Insane Labz</span>
          <span>•</span>
          <span>GNC</span>
          <span>•</span>
          <span>Fast&Up</span>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-heading font-black">
                V1
              </div>
              <span className="font-heading font-black text-lg text-white">
                V1ST NUTRITION
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed font-body">
              Surat's premier dedicated sports nutrition store. Purity, laboratory certified authenticity, and zero amino-spiking guarantee for serious athletes.
            </p>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>FSSAI Central Lic. 10723026000412</span>
            </div>
          </div>

          {/* Col 2: Surat Store Location */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm font-heading uppercase tracking-wider">
              Surat Store Address
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed font-body">
              Shivashta Complex, Velanja Rd, <br />
              Ramvatika Society, Kathor, Velanja, <br />
              Surat, Gujarat 394150
            </p>
            <div className="text-zinc-300">
              WhatsApp / Call: <strong className="text-emerald-400 font-mono">+91 98765 43210</strong>
            </div>
            <div className="text-zinc-400">
              Hours: Mon–Sat 9AM–10PM | Sun 10AM–8PM
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm font-heading uppercase tracking-wider mb-3">
              Direct Access
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#batch-verifier" className="hover:text-emerald-400 transition">
                  → NABL Batch Verification
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-emerald-400 transition">
                  → Whey Isolates & Proteins
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-emerald-400 transition">
                  → Micronized Creatines
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-emerald-400 transition">
                  → Store Location & Timings
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-emerald-400 transition">
                  → Admin Portal Login
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Surat Delivery Promise */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm font-heading uppercase tracking-wider">
              Surat Delivery Zones
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed font-body">
              Same-day delivery active across Velanja, Kathor, Sarthana, Nana Varachha, Katargam, Adajan, Vesu, and all Surat pin codes.
            </p>
            <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 text-[11px] text-zinc-300">
              ⚡ Free 15-Minute Store Counter Pickup available during working hours.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} V1st Nutrition Surat. All rights reserved. 100% Genuine Sports Nutrition.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-emerald-400 transition"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
