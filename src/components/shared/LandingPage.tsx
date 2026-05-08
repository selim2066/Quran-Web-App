"use client";

import React from "react";
import { SearchDialog } from "@/features/search/components/SearchDialog";
import { motion } from "framer-motion";

export function LandingPage() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-[#F4EFE6] overflow-hidden">
      {/* Decorative Lanterns (SVGs) */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 opacity-20 hidden md:block">
        <svg width="60" height="200" viewBox="0 0 60 200">
           <line x1="30" y1="0" x2="30" y2="100" stroke="#8B6E4E" strokeWidth="2" />
           <rect x="15" y="100" width="30" height="40" rx="4" fill="#8B6E4E" />
           <path d="M15 140 L30 160 L45 140 Z" fill="#8B6E4E" />
        </svg>
      </div>
      <div className="absolute top-0 right-1/4 translate-x-1/2 opacity-20 hidden md:block">
        <svg width="60" height="250" viewBox="0 0 60 250">
           <line x1="30" y1="0" x2="30" y2="150" stroke="#8B6E4E" strokeWidth="2" />
           <rect x="15" y="150" width="30" height="40" rx="4" fill="#8B6E4E" />
           <path d="M15 190 L30 210 L45 190 Z" fill="#8B6E4E" />
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center space-y-12 z-10"
      >
        <h1 className="text-7xl md:text-9xl font-serif text-[#3E2F28] tracking-tighter opacity-10 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          QURAN MAZID
        </h1>
        
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold text-[#3E2F28]">QURAN MAZID</h2>
          <div className="flex items-center justify-center gap-2">
             <div className="h-px w-8 bg-[#8B6E4E]/40" />
             <p className="text-[#8B6E4E] font-medium tracking-widest text-sm uppercase">The Light of Guidance</p>
             <div className="h-px w-8 bg-[#8B6E4E]/40" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto w-full px-6">
          <SearchDialog />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {["Al Mulk", "Yasin", "Al Kahf", "Al Ikhlas"].map((item) => (
            <button 
              key={item}
              className="px-6 py-2.5 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl text-sm font-semibold text-[#3E2F28]/70 hover:bg-white hover:text-[#8B6E4E] hover:shadow-lg transition-all"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="pt-12 space-y-4">
           <p className="text-[#3E2F28]/60 italic text-lg max-w-lg mx-auto">
             "And worship your Lord until there comes to you the certainty (death)."
           </p>
           <p className="text-sm font-bold text-[#8B6E4E]">[ Al Hijr : 99 ]</p>
        </div>
      </motion.div>

      {/* Mosque Silhouette at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,200 L0,150 L50,130 L100,150 L150,100 L200,150 L250,80 L300,150 L350,120 L400,150 L450,100 L500,150 L550,70 L600,150 L650,120 L700,150 L750,90 L800,150 L850,110 L900,150 L950,80 L1000,150 L1050,130 L1100,150 L1150,90 L1200,150 L1250,110 L1300,150 L1350,130 L1400,150 L1440,200 Z" fill="#3E2F28" />
        </svg>
      </div>
    </div>
  );
}
