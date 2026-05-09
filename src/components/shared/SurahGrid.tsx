"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Surah } from "@/features/surah/services/quranApi";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

interface SurahGridProps {
  surahs: Surah[];
}

export default function SurahGrid({ surahs }: SurahGridProps) {
  const [displayCount, setDisplayCount] = React.useState(20);
  const [activeTab, setActiveTab] = React.useState("Surah");
  const visibleSurahs = surahs.slice(0, displayCount);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-end mb-6">
        <div className="bg-secondary/50 p-1 rounded-2xl flex items-center gap-1 border border-border/40">
          {["Surah", "Juz", "Page"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                if (tab === "Surah") setActiveTab(tab);
                else toast(`${tab} view is coming soon`);
              }}
              className={cn(
                "px-6 py-1.5 rounded-xl text-xs font-bold transition-all",
                activeTab === tab
                  ? "bg-card text-primary shadow-sm border border-border/50"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {visibleSurahs.map((surah, index) => (
          <SurahCard key={surah.id} surah={surah} index={index} />
        ))}
      </div>

      {displayCount < surahs.length && (
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setDisplayCount(prev => prev + 20)}
            className="flex items-center gap-2 px-8 py-3 bg-secondary hover:bg-secondary/80 text-foreground font-bold rounded-2xl transition-all border border-border/50 group"
          >
            <span>Show More</span>
            <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}

function SurahCard({ surah, index }: { surah: Surah; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 20) * 0.02 }}
    >
      <Link href={`/surah/${surah.id}`}>
        <div className={cn(
          "group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border border-border/40",
          "bg-secondary/40 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/40",
          "dark:bg-card dark:hover:bg-primary/10"
        )}>
          {/* Number Diamond */}
          <div className="relative shrink-0 w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-secondary group-hover:bg-primary/20 rotate-45 rounded-lg transition-colors duration-300" />
            <span className="relative z-10 text-xs font-bold text-foreground/60 group-hover:text-primary transition-colors">
              {surah.id}
            </span>
          </div>

          <div className="flex-1 flex items-center justify-between min-w-0">
            <div className="min-w-0">
              <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
                {surah.name_complex}
              </h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest truncate opacity-60">
                {surah.translated_name.name}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xl font-scheherazade text-foreground leading-none">
                {surah.name_arabic}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
