"use client";

import React from "react";
import { Play, Bookmark, Share2, MoreHorizontal, Copy } from "lucide-react";
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
    <div className="flex-1 p-6 md:p-8 max-w-5xl mx-auto space-y-10">
      {/* Surah Header */}
      <motion.div 
        key={selectedSurah}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2 py-8 bg-card rounded-3xl border border-border shadow-sm"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-scheherazade text-foreground">
          {currentSurah?.name_arabic}
        </h2>
        <div className="flex items-center justify-center gap-3 text-sm text-primary font-bold uppercase tracking-widest">
          <span>{currentSurah?.name_complex}</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>{currentSurah?.verses_count} Ayahs</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>{currentSurah?.revelation_place}</span>
        </div>
      </motion.div>

      <div className="space-y-6" ref={containerRef}>
        {ayahs?.map((ayah, index) => (
          <motion.article
            key={ayah.id}
            id={`ayah-${ayah.verse_key}`}
            className={cn(
              "ayah-card group bg-card border border-border p-6 md:p-10 rounded-[2.5rem] space-y-8",
              currentAyah === ayah.verse_key && "ring-2 ring-primary ring-offset-4 ring-offset-background"
            )}
          >
            {/* Ayah Meta & Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-secondary rounded-xl text-xs font-bold text-primary">
                  {ayah.verse_key}
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setCurrentAyah(ayah.verse_key)}
                    className={cn(
                      "p-2.5 rounded-xl transition-all",
                      currentAyah === ayah.verse_key 
                        ? "bg-primary text-primary-foreground shadow-lg scale-110" 
                        : "text-foreground/40 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    <Play size={20} fill={currentAyah === ayah.verse_key ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={() => handleAction("Bookmark")}
                    className="p-2.5 text-foreground/40 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                  >
                    <Bookmark size={20} />
                  </button>
                  <button 
                    onClick={() => handleAction("Copy")}
                    className="p-2.5 text-foreground/40 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                  >
                    <Copy size={20} />
                  </button>
                  <button 
                    onClick={() => handleAction("Share")}
                    className="p-2.5 text-foreground/40 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Arabic Text */}
            <div className="text-right">
              <p 
                style={{ fontSize: `${fontSizeArabic}px` }}
                className="leading-[2.5] font-scheherazade text-foreground"
              >
                {ayah.text_madani}
                <span className="inline-flex items-center justify-center w-10 h-10 ml-6 rounded-full border border-primary/20 text-xs font-bold text-primary font-sans bg-secondary/50">
                  {index + 1}
                </span>
              </p>
            </div>

            {/* Translation */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase opacity-60">
                {ayah.translations?.[0]?.resource_name || "Saheeh International"}
              </p>
              <p 
                style={{ fontSize: `${fontSizeTranslation}px` }}
                className="text-foreground/80 leading-relaxed font-inter font-medium"
                dangerouslySetInnerHTML={{ __html: ayah.translations?.[0]?.text || "Translation not available" }}
              />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
