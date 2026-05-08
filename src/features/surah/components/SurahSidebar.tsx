"use client";

import React, { useState } from "react";
import { Search, ListFilter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { useQuery } from "@tanstack/react-query";
import { fetchSurahs } from "../services/quranApi";
import { useQuranStore } from "@/store/useQuranStore";

interface SurahSidebarProps {
  className?: string;
  isMobile?: boolean;
  onSelect?: () => void;
}

export function SurahSidebar({ className, isMobile, onSelect }: SurahSidebarProps) {
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
      <div className="p-6 space-y-6">
        {/* Tabs */}
        <div className="flex bg-secondary p-1 rounded-xl">
          {["Surah", "Juz", "Page"].map((tab) => (
            <button 
              key={tab}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all",
                tab === "Surah" ? "bg-card text-primary shadow-sm" : "text-foreground/40 hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-primary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search Surah"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border px-12 py-3 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-foreground/30"
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
            <div className="space-y-1">
              {filteredSurahs?.map((surah) => (
                <motion.button
                  key={surah.id}
                  onClick={() => {
                    setSelectedSurah(surah.id);
                    onSelect?.();
                  }}
                  whileHover={{ x: 4 }}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl transition-all group",
                    selectedSurah === surah.id 
                      ? "bg-primary/10" 
                      : "hover:bg-secondary/50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                      <div className={cn(
                        "absolute inset-0 rotate-45 border-2 rounded-lg transition-colors",
                        selectedSurah === surah.id ? "bg-primary border-primary" : "border-border group-hover:border-primary/30"
                      )} />
                      <span className={cn(
                        "relative text-xs font-bold transition-colors",
                        selectedSurah === surah.id ? "text-primary-foreground" : "text-foreground/60"
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
                      <p className="text-[10px] font-medium text-foreground/40 uppercase tracking-widest">
                        {surah.translated_name.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "text-lg font-scheherazade transition-colors",
                      selectedSurah === surah.id ? "text-primary" : "text-foreground/60"
                    )}>
                      {surah.name_arabic}
                    </p>
                    <p className="text-[9px] font-bold text-foreground/30 uppercase tracking-tighter">
                      {surah.verses_count} Ayahs
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
