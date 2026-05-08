"use client";

import React from "react";
import { Play, Bookmark, Share2, MoreHorizontal, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { useQuery } from "@tanstack/react-query";
import { fetchAyahs, fetchSurahs } from "../../surah/services/quranApi";
import { useQuranStore } from "@/store/useQuranStore";
import { useEffect, useRef } from "react";
import { staggerReveal } from "@/animations/gsap-setup";

export function AyahReader() {
  const { selectedSurah, fontSizeArabic, fontSizeTranslation } = useQuranStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: surahs } = useQuery({
    queryKey: ["surahs"],
    queryFn: fetchSurahs,
  });

  const currentSurah = surahs?.find(s => s.id === selectedSurah);

  const { data: ayahs, isLoading } = useQuery({
    queryKey: ["ayahs", selectedSurah],
    queryFn: () => fetchAyahs(selectedSurah),
  });

  useEffect(() => {
    if (!isLoading && ayahs) {
      staggerReveal(".ayah-card");
    }
  }, [isLoading, ayahs, selectedSurah]);

  if (isLoading) {
    return (
      <div className="flex-1 min-h-screen p-12 max-w-4xl mx-auto space-y-12">
        <div className="h-40 bg-secondary/20 rounded-3xl animate-pulse" />
        <div className="space-y-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-64 bg-secondary/10 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen p-6 md:p-12 max-w-4xl mx-auto space-y-12">
      {/* Surah Header */}
      <motion.div 
        key={selectedSurah}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 pb-12 border-b border-border/50"
      >
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-accent/30" />
          <h2 className="text-3xl md:text-5xl font-bold font-scheherazade text-foreground">
            {currentSurah?.name_arabic}
          </h2>
          <div className="h-px w-12 bg-accent/30" />
        </div>
        <p className="text-lg text-muted-foreground uppercase tracking-widest font-medium">
          {currentSurah?.name_complex}
        </p>
        <p className="text-sm text-accent italic">
          {currentSurah?.verses_count} Ayahs • {currentSurah?.revelation_place}
        </p>
      </motion.div>

      <div className="space-y-8" ref={containerRef}>
        {ayahs?.map((ayah, index) => (
          <motion.article
            key={ayah.id}
            className="ayah-card group bg-white/40 backdrop-blur-sm border border-white/60 p-8 rounded-3xl space-y-8 relative hover:bg-white/60 hover:shadow-xl hover:shadow-[#8B6E4E]/5 transition-all duration-500"
          >
            {/* Ayah Meta & Actions */}
            <div className="flex items-center justify-between pb-6 border-b border-[#8B6E4E]/10">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-[#8B6E4E] uppercase tracking-tighter">Ayah</span>
                  <span className="text-sm font-black text-[#3E2F28]">{ayah.verse_key}</span>
                </div>
                <div className="h-8 w-px bg-[#8B6E4E]/20" />
                <div className="flex items-center gap-2">
                  {[Play, Bookmark, Copy, Share2].map((Icon, i) => (
                    <button key={i} className="p-2.5 text-[#3E2F28]/40 hover:text-[#8B6E4E] hover:bg-[#8B6E4E]/5 rounded-xl transition-all">
                      <Icon size={20} />
                    </button>
                  ))}
                </div>
              </div>
              <button className="p-2 text-[#3E2F28]/30 hover:text-[#3E2F28]">
                <MoreHorizontal size={24} />
              </button>
            </div>

            {/* Arabic Text */}
            <div className="text-right py-4">
              <p 
                style={{ fontSize: `${fontSizeArabic}px` }}
                className="leading-[2.5] font-scheherazade text-[#3E2F28] group-hover:text-[#8B6E4E] transition-colors duration-500"
              >
                {ayah.text_uthmani}
                <span className="inline-flex items-center justify-center w-12 h-12 ml-6 rounded-full border-2 border-[#8B6E4E]/20 text-sm font-bold text-[#8B6E4E] font-sans bg-white/50">
                  {index + 1}
                </span>
              </p>
            </div>

            {/* Translation */}
            <div className="space-y-4 pt-4 border-t border-[#8B6E4E]/5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8B6E4E]" />
                <p className="text-[10px] font-black text-[#8B6E4E] tracking-widest uppercase">
                  {ayah.translations?.[0]?.resource_name || "Saheeh International"}
                </p>
              </div>
              <p 
                style={{ fontSize: `${fontSizeTranslation}px` }}
                className="text-[#3E2F28]/80 leading-relaxed font-inter font-medium"
                dangerouslySetInnerHTML={{ __html: ayah.translations?.[0]?.text || "Translation not available" }}
              />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
