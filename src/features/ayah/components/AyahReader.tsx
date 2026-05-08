"use client";

import React from "react";
import { Play, Bookmark, Share2, MoreHorizontal, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { useQuery } from "@tanstack/react-query";
import { fetchAyahs, fetchSurahs } from "../services/quranApi";
import { useQuranStore } from "@/store/useQuranStore";

export function AyahReader() {
  const { selectedSurah, fontSizeArabic, fontSizeTranslation } = useQuranStore();

  const { data: surahs } = useQuery({
    queryKey: ["surahs"],
    queryFn: fetchSurahs,
  });

  const currentSurah = surahs?.find(s => s.id === selectedSurah);

  const { data: ayahs, isLoading } = useQuery({
    queryKey: ["ayahs", selectedSurah],
    queryFn: () => fetchAyahs(selectedSurah),
  });

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

      {/* Ayahs List */}
      <div className="space-y-16">
        {ayahs?.map((ayah, index) => (
          <motion.article
            key={ayah.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="group space-y-8 relative"
          >
            {/* Ayah Meta & Actions */}
            <div className="flex items-center justify-between pb-4 border-b border-border/30">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {ayah.verse_key}
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
              <p 
                style={{ fontSize: `${fontSizeArabic}px` }}
                className="leading-[2] font-scheherazade text-foreground group-hover:text-accent transition-colors duration-500"
              >
                {ayah.text_uthmani}
                <span className="inline-flex items-center justify-center w-10 h-10 ml-4 rounded-full border border-accent/30 text-xs font-bold text-accent font-sans">
                  {index + 1}
                </span>
              </p>
            </div>

            {/* Translation */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-accent tracking-widest uppercase">
                {ayah.translations[0]?.resource_name}
              </p>
              <p 
                style={{ fontSize: `${fontSizeTranslation}px` }}
                className="text-foreground/80 leading-relaxed font-inter"
                dangerouslySetInnerHTML={{ __html: ayah.translations[0]?.text }}
              />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
