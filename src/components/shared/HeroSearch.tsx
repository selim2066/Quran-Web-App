"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Book, FileText, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchSurahs } from "../../features/surah/services/quranApi";

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: surahs } = useQuery({
    queryKey: ["surahs"],
    queryFn: fetchSurahs,
  });

  const { data: ayahResults, isLoading: isSearching } = useQuery({
    queryKey: ["search-ayahs", query],
    queryFn: async () => {
      if (query.length < 3) return [];
      const res = await fetch(`https://api.quran.com/api/v4/search?q=${query}&language=en&size=5`);
      const data = await res.json();
      return data.search.results || [];
    },
    enabled: query.length >= 3,
  });

  const filteredSurahs = surahs?.filter(s => 
    s.name_complex.toLowerCase().includes(query.toLowerCase()) || 
    s.translated_name.name.toLowerCase().includes(query.toLowerCase()) ||
    s.name_arabic.includes(query)
  ).slice(0, 5) || [];

  const results = [
    ...filteredSurahs.map(s => ({ type: "surah", data: s })),
    ...(ayahResults?.map((a: any) => ({ type: "ayah", data: a })) || [])
  ];

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (result: any) => {
    if (result.type === "surah") {
      router.push(`/surah/${result.data.id}`);
    } else {
      const [surahId] = result.data.verse_key.split(":");
      router.push(`/surah/${surahId}?ayah=${result.data.verse_key}`);
    }
    setIsOpen(false);
    setQuery("");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={containerRef}>
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/20 blur-2xl group-focus-within:bg-primary/30 transition-all rounded-full" />
        <div className="relative flex items-center bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-2 pl-6 shadow-2xl focus-within:border-primary/50 transition-all">
          <Search className="text-primary mr-4" size={24} />
          <input
            type="text"
            placeholder="Search Surah or Ayah (e.g. 'Al-Fatiha', 'Praise be to Allah')"
            className="flex-1 bg-transparent border-none outline-none text-lg py-3 placeholder:text-foreground/30 text-foreground"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={onKeyDown}
          />
          {isSearching && <Loader2 className="animate-spin text-primary mr-4" size={20} />}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && query.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-4 bg-card/95 backdrop-blur-2xl border border-border/50 rounded-3xl shadow-3xl overflow-hidden z-50 max-h-[400px] overflow-y-auto custom-scrollbar"
          >
            {results.length > 0 ? (
              <div className="p-2">
                {results.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group",
                      selectedIndex === index ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-primary/5"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      selectedIndex === index ? "bg-white/20" : "bg-primary/10 text-primary"
                    )}>
                      {result.type === "surah" ? <Book size={20} /> : <FileText size={20} />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold truncate">
                          {result.type === "surah" ? result.data.name_complex : `Verse ${result.data.verse_key}`}
                        </span>
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                          selectedIndex === index ? "bg-white/20 text-white" : "bg-secondary text-primary/60"
                        )}>
                          {result.type}
                        </span>
                      </div>
                      <p className={cn(
                        "text-xs mt-0.5 truncate",
                        selectedIndex === index ? "text-white/70" : "text-muted-foreground"
                      )}>
                        {result.type === "surah" 
                          ? result.data.translated_name.name 
                          : result.data.text.replace(/<[^>]*>?/gm, '')}
                      </p>
                    </div>

                    <ChevronRight 
                      className={cn(
                        "shrink-0 transition-transform",
                        selectedIndex === index ? "translate-x-1" : "text-muted-foreground/30"
                      )} 
                      size={20} 
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center space-y-4">
                <Search className="mx-auto text-muted-foreground/20" size={48} />
                <p className="text-muted-foreground font-medium">No results found for "{query}"</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
