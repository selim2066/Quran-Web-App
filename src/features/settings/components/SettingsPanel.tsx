"use client";

import React from "react";
import { Settings, Palette, Layout, ChevronRight, ChevronDown, ChevronUp, BookOpen, Type } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { useQuranStore } from "@/store/useQuranStore";

interface SettingsPanelProps {
  className?: string;
  isMobile?: boolean;
}

export function SettingsPanel({ className, isMobile }: SettingsPanelProps) {
  const {
    fontSizeArabic, setFontSizeArabic,
    fontSizeTranslation, setFontSizeTranslation,
    arabicFont, setArabicFont
  } = useQuranStore();

  const [isReadingSettingsOpen, setIsReadingSettingsOpen] = React.useState(true);
  const [isFontSettingsOpen, setIsFontSettingsOpen] = React.useState(true);

  const arabicFonts = [
    { name: "KFGQ (Naskh)", class: "font-noto-naskh" },
    { name: "Amiri", class: "font-amiri" },
    { name: "Scheherazade", class: "font-scheherazade" },
  ];

  return (
    <div className={cn(
      "w-80 h-full border-l border-border/10 bg-background flex flex-col",
      !isMobile && "hidden lg:flex",
      className
    )}>
      <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-8">
        {/* View Mode Tabs */}
        <div className="flex p-1 rounded-xl">
          {["Translation", "Reading"].map((tab) => (
            <button
              key={tab}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all",
                tab === "Translation"
                  ? "bg-white text-black shadow-sm"
                  : "text-muted-foreground hover:text-foreground bg-secondary/30"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Settings Groups */}
        <div className="space-y-6">
          {/* Reading Settings */}
          <div className="space-y-4">
            <button 
              onClick={() => setIsReadingSettingsOpen(!isReadingSettingsOpen)}
              className="w-full flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <BookOpen size={18} className={cn("transition-colors", isReadingSettingsOpen ? "text-primary" : "text-muted-foreground")} />
                <span className="text-sm font-bold text-foreground">Reading Settings</span>
              </div>
              {isReadingSettingsOpen ? (
                <ChevronUp size={16} className="text-primary" />
              ) : (
                <ChevronDown size={16} className="text-muted-foreground group-hover:text-primary" />
              )}
            </button>
            <motion.div
              initial={false}
              animate={{ height: isReadingSettingsOpen ? "auto" : 0, opacity: isReadingSettingsOpen ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <div className="h-px bg-border/30" />
              </div>
            </motion.div>
          </div>

          {/* Font Settings Accordion */}
          <div className="space-y-6">
            <button 
              onClick={() => setIsFontSettingsOpen(!isFontSettingsOpen)}
              className="w-full flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Palette size={18} className={cn("transition-colors", isFontSettingsOpen ? "text-primary" : "text-muted-foreground")} />
                <span className={cn("text-sm font-bold transition-colors", isFontSettingsOpen ? "text-primary" : "text-foreground")}>Font Settings</span>
              </div>
              {isFontSettingsOpen ? (
                <ChevronUp size={16} className="text-primary" />
              ) : (
                <ChevronDown size={16} className="text-muted-foreground group-hover:text-primary" />
              )}
            </button>

            <motion.div
              initial={false}
              animate={{ height: isFontSettingsOpen ? "auto" : 0, opacity: isFontSettingsOpen ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-6 pt-2">
                <div className="space-y-6">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-muted-foreground">Arabic Font Size</span>
                    <span className="text-primary">{fontSizeArabic}</span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="64"
                    value={fontSizeArabic}
                    onChange={(e) => setFontSizeArabic(parseInt(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-muted-foreground">Translation Font Size</span>
                    <span className="text-primary">{fontSizeTranslation}</span>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="32"
                    value={fontSizeTranslation}
                    onChange={(e) => setFontSizeTranslation(parseInt(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="space-y-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Arabic Font Face</span>
                  <div className="grid grid-cols-1 gap-2">
                    {arabicFonts.map((font) => (
                      <button
                        key={font.name}
                        onClick={() => setArabicFont(font.class)}
                        className={cn(
                          "w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all border",
                          arabicFont === font.class
                            ? "bg-primary/[0.05] border-primary/30 text-primary"
                            : "bg-card border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                        )}
                      >
                        <span className="font-medium">{font.name}</span>
                        <ChevronRight size={16} className={cn(
                          "transition-colors",
                          arabicFont === font.class ? "text-primary" : "text-foreground/20"
                        )} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Support Card */}
        <div className="mt-8 p-6 bg-primary/5 rounded-3xl border border-primary/10 space-y-4">
          <h4 className="font-bold text-foreground leading-tight text-sm">Help spread the knowledge of Islam</h4>
          <p className="text-[10px] text-foreground/60 leading-relaxed font-medium">
            Your regular support helps us reach our religious brothers and sisters with the message of Islam. Join our mission and be part of the big change.
          </p>
          <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-xs font-bold shadow-sm hover:opacity-90 transition-all">
            Support Us
          </button>
        </div>
      </div>
    </div>
  );
}
