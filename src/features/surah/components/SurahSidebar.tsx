// surah sidebar component

"use client";

import React, { useState } from "react";
import { Search, ListFilter, X, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { useQuery } from "@tanstack/react-query";
import { fetchSurahs } from "../services/quranApi";
import { useQuranStore } from "@/store/useQuranStore";

interface SurahSidebarProps {
  className?: string;
  isMobile?: boolean;
  onSelect?: () => void;
  onClose?: () => void;
}

export function SurahSidebar({ className, isMobile, onSelect, onClose }: SurahSidebarProps) {
  const [search, setSearch] = useState("");
  const { selectedSurah, setSelectedSurah } = useQuranStore();

  const { data: surahs, isLoading } = useQuery({
    queryKey: ["surahs"],
    queryFn: fetchSurahs,
  });

  const filteredSurahs = surahs?.filter(s =>
    s.name_complex.toLowerCase().includes(search.toLowerCase()) ||
    s.translated_name.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={cn(
      "w-80 h-full border-r border-border/10 bg-background/50 backdrop-blur-sm flex flex-col",
      !isMobile && "hidden xl:flex",
      className
    )}>
      {isMobile && (
        <div className="p-6 flex items-center justify-between border-b border-border/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen size={18} className="text-primary-foreground" />
            </div>
            <span className="font-bold font-serif text-lg text-foreground">Quran Mazid</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-primary transition-all"
          >
            <X size={20} />
          </button>
        </div>
      )}
      <div className="p-6 space-y-6">
        {/* Tabs */}
        <div className="flex p-1 rounded-xl">
          {["Surah", "Juz", "Page"].map((tab) => (
            <button
              key={tab}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all",
                tab === "Surah"
                  ? "bg-white text-black shadow-sm"
                  : "text-muted-foreground hover:text-foreground bg-secondary/30"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
          <input
            type="text"
            placeholder="Search Surah"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border/60 px-12 py-3 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-2 space-y-1">
          {isLoading ? (
            <div className="p-4 space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-16 bg-secondary/30 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-2 p-2">
              {filteredSurahs?.map((surah) => (
                <motion.button
                  key={surah.id}
                  onClick={() => {
                    setSelectedSurah(surah.id);
                    onSelect?.();
                  }}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-2xl transition-all group border",
                    selectedSurah === surah.id
                      ? "bg-primary/10 border-l-2 border-primary shadow-lg shadow-primary/5"
                      : "bg-card border border-border/60 hover:border-primary/30"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                      <div className={cn(
                        "absolute inset-0 rotate-45 border-2 rounded-lg transition-all duration-300",
                        selectedSurah === surah.id
                          ? "bg-primary border-primary shadow-lg shadow-primary/30"
                          : "bg-card border-2 border-border/60 group-hover:border-primary/30"
                      )} />
                      <span className={cn(
                        "relative text-xs font-bold transition-colors",
                        selectedSurah === surah.id ? "text-primary-foreground" : "text-accent-foreground"
                      )}>
                        {surah.id}
                      </span>
                    </div>
                    <div className="text-left">
                      <h4 className={cn(
                        "text-sm font-bold transition-colors",
                        selectedSurah === surah.id ? "text-primary" : "text-foreground"
                      )}>
                        {surah.name_complex}
                      </h4>
                      <p className="text-[10px] font-medium text-foreground/40 uppercase tracking-widest mt-0.5">
                        {surah.translated_name.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "text-lg font-scheherazade transition-colors leading-none",
                      selectedSurah === surah.id ? "text-primary" : "text-foreground/60"
                    )}>
                      {surah.name_arabic}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
