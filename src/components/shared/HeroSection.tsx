"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAyahs } from "../../features/surah/services/quranApi";
import { HeroSearch } from "./HeroSearch";
import Link from "next/link";

const SLIDE_SURAH_IDS = [1, 36, 67, 18, 55, 112];
const QUICK_LINKS = [
  { id: 36, name: "Yasin" },
  { id: 67, name: "Mulk" },
  { id: 56, name: "Waqiah" },
  { id: 112, name: "Ikhlas" },
  { id: 18, name: "Kahf" },
];

export function HeroSection() {
  const [slides, setSlides] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        // Fetch 1 ayah from each selected surah for the slider
        const ayahPromises = SLIDE_SURAH_IDS.map(id => fetchAyahs(id));
        const allAyahs = await Promise.all(ayahPromises);
        
        const preparedSlides = allAyahs.map((ayahs, index) => {
          const randomAyah = ayahs[Math.floor(Math.random() * ayahs.length)];
          return {
            ...randomAyah,
            surahName: SLIDE_SURAH_IDS[index] === 1 ? "Al-Fatiha" : 
                       SLIDE_SURAH_IDS[index] === 36 ? "Yasin" :
                       SLIDE_SURAH_IDS[index] === 67 ? "Al-Mulk" :
                       SLIDE_SURAH_IDS[index] === 18 ? "Al-Kahf" :
                       SLIDE_SURAH_IDS[index] === 55 ? "Ar-Rahman" : "Al-Ikhlas"
          };
        });
        
        setSlides(preparedSlides);
      } catch (error) {
        console.error("Failed to load hero slides:", error);
      }
    };

    loadSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-full min-h-[600px] flex flex-col items-center justify-center pt-24 pb-32 overflow-hidden bg-background border-b border-border/10">
      {/* Background Decorative Patterns */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none overflow-hidden">
        <div className="absolute top-0 left-0 text-[20rem] font-serif -translate-x-1/2 -translate-y-1/2">قرآن</div>
        <div className="absolute bottom-0 right-0 text-[20rem] font-serif translate-x-1/2 translate-y-1/2">مجيد</div>
      </div>

      <div className="container mx-auto px-6 relative z-10 space-y-16">
        {/* Ayah Slider */}
        <div className="h-40 md:h-48 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {slides.length > 0 ? (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="text-center space-y-6 max-w-4xl"
              >
                <p className="text-3xl md:text-5xl font-scheherazade text-foreground leading-relaxed line-clamp-2">
                  {slides[currentSlide].text_madani}
                </p>
                <div className="space-y-2">
                  <p className="text-sm md:text-base text-muted-foreground font-medium italic line-clamp-1">
                    "{slides[currentSlide].translations[0].text.replace(/<[^>]*>?/gm, '')}"
                  </p>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
                    {slides[currentSlide].surahName} • {slides[currentSlide].verse_key}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-24 w-64 bg-primary/5 rounded-full animate-pulse" />
            )}
          </AnimatePresence>
        </div>

        {/* Hero Search & Quick Links */}
        <div className="max-w-3xl mx-auto w-full space-y-8">
          <HeroSearch />
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mr-2">Quick Links:</span>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.id}
                href={`/surah/${link.id}`}
                className="px-5 py-2 bg-secondary/50 hover:bg-primary hover:text-white text-foreground/70 text-xs font-bold rounded-full transition-all border border-border/40 hover:border-primary shadow-sm active:scale-95"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mosque Silhouette at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,200 L0,150 L50,130 L100,150 L150,100 L200,150 L250,80 L300,150 L350,120 L400,150 L450,100 L500,150 L550,70 L600,150 L650,120 L700,150 L750,90 L800,150 L850,110 L900,150 L950,80 L1000,150 L1050,130 L1100,150 L1150,90 L1200,150 L1250,110 L1300,150 L1350,130 L1400,150 L1440,200 Z" fill="currentColor" className="text-foreground" />
        </svg>
      </div>
    </section>
  );
}
