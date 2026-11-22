import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Search, CheckCircle2, AlertTriangle, FileText, Award, FlaskConical, Lock, Sparkles } from 'lucide-react';
import { api, BATCH_REGISTRY } from '../api/axios';

const SAMPLE_CODES = [
  'V1ST-2026-WH01',
  'V1ST-2026-CR02',
  'ON-2026-GLD9',
  'MB-2026-BZ44',
];

export default function AuthenticitySection() {
  const [batchCodeInput, setBatchCodeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = async (codeToVerify) => {
    const code = (codeToVerify || batchCodeInput).trim().toUpperCase();
    if (!code) return;

    setLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      // First attempt backend API call
      const response = await api.get(`/batch-verify/${code}`);
      if (response.data && response.data.verified) {
        setResult(response.data.batchDetails);
      } else {
        setErrorMsg('Batch could not be verified in the national database.');
      }
    } catch (err) {
      // Fallback to local verified registry
      if (BATCH_REGISTRY[code]) {
        setResult(BATCH_REGISTRY[code]);
      } else {
        setErrorMsg(
          `Batch code "${code}" not found. Verify the code on your container shoulder or bring it to our Velanja Rd store for instant laser scanning.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="batch-verifier" className="py-20 lg:py-28 relative bg-[#09090B] border-t border-b border-white/5 overflow-hidden">
      {/* Radial Emerald Ambient Light Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 text-xs font-mono mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            100% TRANSPARENT LAB TESTING
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight mb-4 text-white">
            NEVER CONSUME A <span className="text-gradient-volt">QUESTIONABLE</span> BATCH.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-body">
            India’s supplement market is flooded with counterfeits and amino-spiked tubs. At V1st Nutrition Surat, every batch undergoes independent NABL accredited laboratory chromatography testing before reaching our shelves.
          </p>
        </motion.div>

        {/* Interactive Batch Verification Tool Card with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="max-w-3xl mx-auto glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-white/10 mb-16 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Corner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={batchCodeInput}
                onChange={(e) => setBatchCodeInput(e.target.value.toUpperCase())}
                placeholder="Enter 10-digit Batch Code (e.g. V1ST-2026-WH01)"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-900/90 border border-white/15 text-white font-mono placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 text-sm sm:text-base tracking-wider uppercase transition shadow-inner"
              />
            </div>
            <button
              onClick={() => handleVerify()}
              disabled={loading}
              className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm tracking-wide transition shadow-volt-glow disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4 fill-black" />
              )}
              <span>Verify Batch</span>
            </button>
          </div>

          {/* Quick Clickable Sample Codes */}
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-zinc-400 font-mono">
            <span>Quick Test Batches:</span>
            {SAMPLE_CODES.map((code) => (
              <button
                key={code}
                onClick={() => {
                  setBatchCodeInput(code);
                  handleVerify(code);
                }}
                className="px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-emerald-400 border border-white/10 transition active:scale-95"
              >
                {code}
              </button>
            ))}
          </div>

          {/* Results Display with Subtle Holographic Shimmer */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.35 }}
                className="holo-card p-6 rounded-2xl border border-emerald-500/50 bg-[#121217] relative shadow-2xl overflow-hidden"
              >
                <div className="holo-content">
                  {/* Verified Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-volt-glow">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          NABL LAB CERTIFICATE VERIFIED
                        </span>
                        <h4 className="text-lg font-bold text-white font-heading">
                          {result.product}
                        </h4>
                      </div>
                    </div>
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500 text-black shadow-sm">
                      GENUINE PASS
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono mb-4">
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10">
                      <span className="text-zinc-400 block mb-1">Brand & Manufacturer:</span>
                      <span className="text-white font-semibold text-sm">{result.brand}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10">
                      <span className="text-zinc-400 block mb-1">Tested Purity Level:</span>
                      <span className="text-emerald-400 font-bold text-sm">{result.testedPurity}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10">
                      <span className="text-zinc-400 block mb-1">Manufacturing / Expiry:</span>
                      <span className="text-white font-semibold">{result.mfgDate} • {result.expDate}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10">
                      <span className="text-zinc-400 block mb-1">FSSAI Central Lic:</span>
                      <span className="text-white font-semibold">{result.fssaiLicense}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-950/90 border border-white/10 text-xs text-zinc-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FlaskConical className="w-4 h-4 text-amber-400" />
                      <span>NABL Report ID: <strong className="text-white font-mono">{result.nablReportId}</strong></span>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      Inspected at Surat Distribution Hub
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {errorMsg && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs font-mono flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white mb-1">Verification Unsuccessful</strong>
                  {errorMsg}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 4 Pillars of Authenticity with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-emerald-500/40 transition duration-300 group hover:shadow-volt-glow"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              Direct Brand Importers
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-body">
              We procure directly from official Indian importers (Glanbia, Bright Commodities, MuscleBlaze) with unbroken chain-of-custody documentation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-amber-500/40 transition duration-300 group hover:shadow-amber-glow"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              NABL Chromatography
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-body">
              Random batch samples are HPLC analyzed for exact protein concentration, ensuring you get exactly the 27g protein promised on the front label.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: 0.19 }}
            className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-emerald-500/40 transition duration-300 group hover:shadow-volt-glow"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              Zero Amino-Spiking
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-body">
              We strictly reject products padded with cheap glycine, taurine, or creatine fillers to falsely inflate Kjeldahl nitrogen test scores.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-purple-500/40 transition duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              In-Store Inspection
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-body">
              Visit our store at Shivashta Complex, Velanja Rd. Scratch the authentication code and scan QR seals directly at the billing counter before buying.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
