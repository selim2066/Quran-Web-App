"use client";

import React from "react";
import { Play, Bookmark, Share2, MoreHorizontal, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock data for initial UI
const MOCK_AYAH = [
  { 
    id: 1, 
    number: "1:1", 
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", 
    translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    reference: "Saheeh International"
  },
  { 
    id: 2, 
    number: "1:2", 
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", 
    translation: "[All] praise is [due] to Allah, Lord of the worlds -",
    reference: "Saheeh International"
  },
  { 
    id: 3, 
    number: "1:3", 
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ", 
    translation: "The Entirely Merciful, the Especially Merciful,",
    reference: "Saheeh International"
  },
  { 
    id: 4, 
    number: "1:4", 
    arabic: "مَالِكِ يَوْمِ الدِّينِ", 
    translation: "Sovereign of the Day of Recompense.",
    reference: "Saheeh International"
  },
];

export function AyahReader() {
  return (
    <div className="flex-1 min-h-screen p-6 md:p-12 max-w-4xl mx-auto space-y-12">
      {/* Surah Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 pb-12 border-b border-border/50"
      >
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-accent/30" />
          <h2 className="text-3xl md:text-5xl font-bold font-scheherazade text-foreground">سورة الفاتحة</h2>
          <div className="h-px w-12 bg-accent/30" />
        </div>
        <p className="text-lg text-muted-foreground uppercase tracking-widest font-medium">Al-Fatihah</p>
        <p className="text-sm text-accent italic">7 Ayahs • Makkah</p>
      </motion.div>

      {/* Ayahs List */}
      <div className="space-y-16">
        {MOCK_AYAH.map((ayah, index) => (
          <motion.article
            key={ayah.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group space-y-8 relative"
          >
            {/* Ayah Meta & Actions */}
            <div className="flex items-center justify-between pb-4 border-b border-border/30">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {ayah.number}
                </span>
                <div className="flex items-center gap-1">
                  {[Play, Bookmark, Copy, Share2].map((Icon, i) => (
                    <button key={i} className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-all">
                      <Icon size={18} />
                    </button>
                  ))}
                </div>
              </div>
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Arabic Text */}
            <div className="text-right">
              <p className="text-4xl md:text-5xl leading-[1.8] font-scheherazade text-foreground group-hover:text-accent transition-colors duration-500">
                {ayah.arabic}
                <span className="inline-flex items-center justify-center w-10 h-10 ml-4 rounded-full border border-accent/30 text-xs font-bold text-accent font-sans">
                  {ayah.id}
                </span>
              </p>
            </div>

            {/* Translation */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-accent tracking-widest uppercase">{ayah.reference}</p>
              <p className="text-lg text-foreground/80 leading-relaxed font-inter">
                {ayah.translation}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
