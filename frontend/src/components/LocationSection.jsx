import React from 'react';
import { MapPin, Clock, Phone, Navigation, Award, CheckCircle, Shield, MessageCircle } from 'lucide-react';

export default function LocationSection() {
  const storeAddress = 'Shivashta Complex, Velanja Rd, Ramvatika Society, Kathor, Velanja, Surat, Gujarat 394150';
  const storePhone = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Shivashta Complex, Velanja Rd, Ramvatika Society, Kathor, Velanja, Surat, Gujarat 394150'
  )}`;

  return (
    <section id="location" className="py-20 lg:py-28 relative bg-[#09090B] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <MapPin className="w-4 h-4" />
            SURAT PHYSICAL SHOWROOM
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight mb-4 text-white">
            VISIT OUR <span className="text-gradient-volt">FLAGSHIP HUB</span> IN SURAT
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Experience sports nutrition with total transparency. Walk into our Velanja Road store, speak with certified nutrition specialists, and inspect tamper-evident seals before purchasing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Store Details & Perks */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Address Card */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-white/10 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    V1st Nutrition Surat Showroom
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-mono mt-1 leading-relaxed">
                    Shivashta Complex, Velanja Rd, Ramvatika Society, Kathor, Velanja, Surat, Gujarat 394150
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">Store Hours</h4>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Monday – Saturday: <strong>9:00 AM – 10:00 PM</strong> <br />
                    Sunday: <strong>10:00 AM – 8:00 PM</strong>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition shadow-volt-glow"
                >
                  <Navigation className="w-4 h-4 fill-black" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={`https://wa.me/${storePhone}?text=${encodeURIComponent(
                    'Hello V1st Nutrition! I am planning to visit your Velanja Rd store.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl glass-panel hover:bg-zinc-800 text-zinc-200 text-xs font-semibold border border-white/10 transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Chat with Store</span>
                </a>
              </div>
            </div>

            {/* In-Store Perks */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
                Complimentary In-Store Perks:
              </h4>

              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Free InBody Scan</strong>: Full body fat & skeletal muscle metrics</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Flavor Tasting Station</strong>: Taste whey samples before buying</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Laser Batch Scanner</strong>: Verify brand authenticity at the billing counter</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Map Viewport */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden glass-panel border border-white/10 relative min-h-[380px] flex flex-col">
            <iframe
              title="V1st Nutrition Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14873.342159049903!2d72.8899818!3d21.2581628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f4640000001%3A0x8c7bb862a98f1234!2sVelanja%20Rd%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px', filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full flex-1"
            />
            
            {/* Live Store Status Overlay */}
            <div className="absolute top-4 right-4 bg-zinc-950/90 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md text-xs font-mono text-zinc-300 flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STORE OPEN TODAY TIL 10 PM</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
