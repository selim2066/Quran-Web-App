"use client";

import React from "react";
import { Settings, Type, Layout, Palette, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { useQuranStore } from "@/store/useQuranStore";

export function SettingsPanel() {
  const { 
    fontSizeArabic, setFontSizeArabic, 
    fontSizeTranslation, setFontSizeTranslation 
  } = useQuranStore();

  return (
    <div className="w-80 h-[calc(100vh-4rem)] border-l border-border bg-card/30 backdrop-blur-sm flex flex-col hidden lg:flex">
      <div className="p-6 space-y-8">
        <div className="flex items-center gap-2">
          <Settings size={20} className="text-accent" />
          <h2 className="text-lg font-semibold">Settings</h2>
        </div>

        {/* Font Settings */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-widest">
            <Type size={14} />
            <span>Typography</span>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Arabic Font Size</span>
                <span className="text-accent font-bold">{fontSizeArabic}px</span>
              </div>
              <input 
                type="range" 
                min="24" 
                max="64" 
                value={fontSizeArabic}
                onChange={(e) => setFontSizeArabic(parseInt(e.target.value))}
                className="w-full accent-accent cursor-pointer" 
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Translation Font Size</span>
                <span className="text-accent font-bold">{fontSizeTranslation}px</span>
              </div>
              <input 
                type="range" 
                min="14" 
                max="32" 
                value={fontSizeTranslation}
                onChange={(e) => setFontSizeTranslation(parseInt(e.target.value))}
                className="w-full accent-accent cursor-pointer" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm">Arabic Font Face</label>
              <button className="w-full flex items-center justify-between p-3 bg-secondary/50 rounded-xl border border-border/50 hover:border-accent/30 transition-all text-sm">
                <span>Scheherazade New</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Appearance Settings */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-widest">
            <Palette size={14} />
            <span>Appearance</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {["Light", "Dark", "Sepia"].map((mode) => (
              <button 
                key={mode}
                className={cn(
                  "p-2 rounded-lg border border-border text-xs font-medium transition-all",
                  mode === "Light" ? "bg-accent text-accent-foreground border-accent" : "hover:border-accent/30"
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </section>

        {/* Reading Settings */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-widest">
            <Layout size={14} />
            <span>Layout</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl text-sm">
              <span>Reading Mode</span>
              <div className="w-10 h-5 bg-accent rounded-full relative p-1 cursor-pointer">
                <div className="w-3 h-3 bg-white rounded-full absolute right-1" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-auto p-6">
        <div className="p-4 bg-accent/5 border border-accent/20 rounded-2xl space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Help spread the knowledge of Islam. Support our mission to make Quran accessible to everyone.
          </p>
          <button className="w-full py-2 bg-accent text-accent-foreground rounded-xl text-xs font-bold hover:opacity-90 transition-all">
            Support Us
          </button>
        </div>
      </div>
    </div>
  );
}
