"use client";

import React, { useState } from "react";
import { Search, ListFilter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { useQuery } from "@tanstack/react-query";
import { fetchSurahs } from "../services/quranApi";
import { useQuranStore } from "@/store/useQuranStore";

export function SurahSidebar() {
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
    <div className="w-80 h-[calc(100vh-4rem)] border-r border-border bg-card/30 backdrop-blur-sm flex flex-col hidden xl:flex">
      <div className="p-4 border-b border-border space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Surahs</h2>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <ListFilter size={18} className="text-muted-foreground" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input 
            type="text" 
            placeholder="Search surah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary/50 border-none px-10 py-2 rounded-xl text-sm outline-none focus:ring-1 focus:ring-accent/30 transition-all"
          />
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          )}
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
            filteredSurahs?.map((surah) => (
              <motion.button
                key={surah.id}
                onClick={() => setSelectedSurah(surah.id)}
                whileHover={{ x: 4 }}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-all group hover:bg-secondary/80",
                  selectedSurah === surah.id ? "bg-accent/10 border border-accent/20" : "border border-transparent"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold rotate-45 group-hover:rotate-0 transition-transform",
                    selectedSurah === surah.id ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                  )}>
                    <span className={selectedSurah === surah.id ? "" : "-rotate-45 group-hover:rotate-0 transition-transform"}>
                      {surah.id}
                    </span>
                  </div>
                  <div className="text-left">
                    <h3 className={cn(
                      "text-sm font-semibold transition-colors",
                      selectedSurah === surah.id ? "text-accent" : "group-hover:text-accent"
                    )}>
                      {surah.name_complex}
                    </h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{surah.translated_name.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-arabic text-foreground/80">{surah.name_arabic}</p>
                  <p className="text-[10px] text-muted-foreground">{surah.verses_count} Ayahs</p>
                </div>
              </motion.button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
