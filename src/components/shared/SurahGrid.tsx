"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Surah } from "@/features/surah/services/quranApi";
import { cn } from "@/lib/utils";

interface SurahGridProps {
  surahs: Surah[];
}

export function SurahGrid({ surahs }: SurahGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {surahs.map((surah, index) => (
        <SurahCard key={surah.id} surah={surah} index={index} />
      ))}
    </div>
  );
}

function SurahCard({ surah, index }: { surah: Surah; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
    >
      <Link href={`/surah/${surah.id}`}>
        <div className="group relative bg-card border border-border/50 hover:border-primary/50 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 active:scale-[0.98]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary font-bold shadow-inner relative overflow-hidden group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <span className="relative z-10">{surah.id}</span>
              <div className="absolute inset-0 opacity-10 font-serif text-3xl flex items-center justify-center translate-y-1">۞</div>
            </div>
            
            <div className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
              surah.revelation_place === "makkah" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            )}>
              {surah.revelation_place}
            </div>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-foreground truncate group-hover:text-primary transition-colors">
                {surah.name_complex}
              </h3>
              <p className="text-xs text-muted-foreground font-medium truncate uppercase tracking-widest opacity-60">
                {surah.translated_name.name}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl font-scheherazade text-foreground leading-none mb-1">
                {surah.name_arabic}
              </p>
              <p className="text-[10px] font-bold text-primary/60 uppercase">
                {surah.verses_count} Ayahs
              </p>
            </div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-10 transition-opacity">
            <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
              <path d="M100,0 L100,100 L0,100 Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
