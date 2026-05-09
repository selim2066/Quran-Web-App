"use client";

import React from "react";
import { Play, Bookmark, Share2, MoreHorizontal, Copy, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { useQuery } from "@tanstack/react-query";
import { fetchAyahs, fetchSurahs } from "../../surah/services/quranApi";
import { useQuranStore } from "@/store/useQuranStore";
import { useEffect, useRef } from "react";

import { toast } from "sonner";

export function AyahReader() {
  const { 
    selectedSurah, 
    fontSizeArabic, 
    fontSizeTranslation,
    arabicFont,
    currentAyah,
    setCurrentAyah 
  } = useQuranStore();
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
    const params = new URLSearchParams(window.location.search);
    const ayahKey = params.get("ayah");
    if (ayahKey && !isLoading) {
      setTimeout(() => {
        const element = document.getElementById(`ayah-${ayahKey}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          setCurrentAyah(ayahKey);
        }
      }, 500);
    }
  }, [isLoading, setCurrentAyah]);

  const handleAction = (label: string) => {
    toast(`${label} feature is coming soon`);
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-12 max-w-4xl mx-auto space-y-12">
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
    <div className="flex-1 p-6 md:p-8 max-w-5xl mx-auto space-y-0">
      {/* Surah Header */}
      <motion.div 
        key={selectedSurah}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-12 text-center py-10 overflow-hidden"
      >
        {/* Mosque Silhouette Overlay */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-[0.08] dark:opacity-[0.15]">
           <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
           </svg>
        </div>

        <div className="space-y-2 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">
            {currentSurah?.name_complex}
          </h2>
          <div className="text-sm text-muted-foreground font-medium">
             {currentSurah?.name_arabic} • {currentSurah?.verses_count} Ayahs, {currentSurah?.revelation_place}
          </div>
        </div>
      </motion.div>

      <div className="divide-y divide-border/10" ref={containerRef}>
        {ayahs?.map((ayah, index) => (
          <motion.article
            key={ayah.id}
            id={`ayah-${ayah.verse_key}`}
            className={cn(
              "group flex gap-8 py-12 px-2 transition-all duration-500",
              currentAyah === ayah.verse_key && "bg-primary/[0.03]"
            )}
          >
            {/* Left Vertical Action Bar */}
            <div className="flex flex-col items-center gap-6 pt-1 shrink-0">
              <span className="text-sm font-bold text-primary mb-2">{ayah.verse_key}</span>
              
              <button 
                onClick={() => setCurrentAyah(ayah.verse_key)}
                className="text-muted-foreground hover:text-primary transition-all"
              >
                <Play size={20} />
              </button>

              <button 
                onClick={() => handleAction("Book")}
                className="text-muted-foreground hover:text-primary transition-all"
              >
                <BookOpen size={20} />
              </button>

              <button 
                onClick={() => handleAction("Bookmark")}
                className="text-muted-foreground hover:text-primary transition-all"
              >
                <Bookmark size={20} />
              </button>

              <button 
                onClick={() => handleAction("More")}
                className="text-muted-foreground hover:text-primary transition-all"
              >
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Ayah Content */}
            <div className="flex-1 space-y-10">
              {/* Arabic Text */}
              <div className="text-right">
                <p 
                  style={{ fontSize: `${fontSizeArabic}px` }}
                  className={cn("leading-[2.8] text-foreground font-medium", arabicFont)}
                >
                  {ayah.text_madani}
                </p>
              </div>

              {/* Translation */}
              <div className="space-y-4 max-w-3xl">
                <p className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
                  {ayah.translations?.[0]?.resource_name || "Saheeh International"}
                </p>
                <p 
                  style={{ fontSize: `${fontSizeTranslation}px` }}
                  className="text-foreground/90 leading-relaxed font-inter font-medium text-lg"
                  dangerouslySetInnerHTML={{ __html: ayah.translations?.[0]?.text || "Translation not available" }}
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
