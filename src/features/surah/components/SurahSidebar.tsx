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
    <div className="w-80 h-[calc(100vh-5rem)] border-r border-[#8B6E4E]/10 bg-transparent flex flex-col hidden xl:flex">
      <div className="p-6 space-y-6">
        {/* Tabs */}
        <div className="flex bg-[#E8E2D6] p-1 rounded-xl">
          {["Surah", "Juz", "Page"].map((tab) => (
            <button 
              key={tab}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all",
                tab === "Surah" ? "bg-white text-[#8B6E4E] shadow-sm" : "text-[#3E2F28]/40 hover:text-[#3E2F28]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3E2F28]/30 group-focus-within:text-[#8B6E4E] transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search Surah"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/50 border border-white/60 px-12 py-3 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#8B6E4E]/20 transition-all placeholder:text-[#3E2F28]/30"
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
            filteredSurahs?.map((surah) => (
              <motion.button
                key={surah.id}
                onClick={() => setSelectedSurah(surah.id)}
                whileHover={{ x: 4 }}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl transition-all group hover:bg-white/60",
                  selectedSurah === surah.id ? "bg-white shadow-lg border border-[#8B6E4E]/20" : "bg-transparent border border-transparent"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 flex items-center justify-center text-xs font-bold relative",
                    selectedSurah === surah.id ? "text-white" : "text-[#8B6E4E]"
                  )}>
                    {/* Rhombus Background */}
                    <div className={cn(
                      "absolute inset-0 rotate-45 rounded-lg transition-all duration-300",
                      selectedSurah === surah.id ? "bg-[#8B6E4E]" : "bg-[#E8E2D6] group-hover:bg-[#8B6E4E]/20"
                    )} />
                    <span className="relative z-10">{surah.id}</span>
                  </div>
                  <div className="text-left">
                    <h3 className={cn(
                      "text-sm font-bold transition-colors",
                      selectedSurah === surah.id ? "text-[#8B6E4E]" : "text-[#3E2F28] group-hover:text-[#8B6E4E]"
                    )}>
                      {surah.name_complex}
                    </h3>
                    <p className="text-[10px] text-[#8B6E4E]/60 font-medium uppercase tracking-wider">{surah.translated_name.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-arabic text-[#3E2F28]/80 group-hover:text-[#8B6E4E] transition-colors">{surah.name_arabic}</p>
                </div>
              </motion.button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
