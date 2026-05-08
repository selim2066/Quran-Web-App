"use client";

import React from "react";
import { Settings, Type, Layout, Palette, ChevronRight, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { useQuranStore } from "@/store/useQuranStore";

export function SettingsPanel() {
  const {
    fontSizeArabic, setFontSizeArabic,
    fontSizeTranslation, setFontSizeTranslation
  } = useQuranStore();

  return (
    <div className="w-80 h-[calc(100vh-5rem)] border-l border-[#8B6E4E]/10 bg-transparent flex flex-col hidden lg:flex">
      <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-6">
        {/* View Mode Tabs */}
        <div className="flex bg-[#E8E2D6] p-1 rounded-xl">
          {["Translation", "Reading"].map((tab) => (
            <button
              key={tab}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all",
                tab === "Translation" ? "bg-white text-[#8B6E4E] shadow-sm" : "text-[#3E2F28]/40 hover:text-[#3E2F28]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Reading Settings Accordion */}
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <BookOpen size={18} className="text-[#8B6E4E]" />
              <span className="text-sm font-bold text-[#3E2F28]">Reading Settings</span>
            </div>
            <ChevronDown size={16} className="text-[#3E2F28]/30 group-hover:text-[#8B6E4E]" />
          </button>
          <div className="h-px bg-[#8B6E4E]/10" />
        </div>

        {/* Font Settings */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Type size={18} className="text-[#8B6E4E]" />
              <span className="text-sm font-bold text-[#3E2F28]">Font Settings</span>
            </div>
            <ChevronUp size={16} className="text-[#8B6E4E]" />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#3E2F28]/60">Arabic Font Size</span>
                <span className="text-[#8B6E4E]">{fontSizeArabic}</span>
              </div>
              <input
                type="range"
                min="24"
                max="64"
                value={fontSizeArabic}
                onChange={(e) => setFontSizeArabic(parseInt(e.target.value))}
                className="w-full accent-[#8B6E4E] h-1 bg-[#E8E2D6] rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#3E2F28]/60">Translation Font Size</span>
                <span className="text-[#8B6E4E]">{fontSizeTranslation}</span>
              </div>
              <input
                type="range"
                min="14"
                max="32"
                value={fontSizeTranslation}
                onChange={(e) => setFontSizeTranslation(parseInt(e.target.value))}
                className="w-full accent-[#8B6E4E] h-1 bg-[#E8E2D6] rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-[#3E2F28]/60">Arabic Font Face</span>
              <button className="w-full flex items-center justify-between p-3 bg-white/50 border border-white/60 rounded-xl text-sm font-bold text-[#3E2F28]">
                <span>KFGQ</span>
                <ChevronRight size={16} className="text-[#3E2F28]/30" />
              </button>
            </div>
          </div>
        </div>

        {/* Support Card */}
        <div className="mt-8 p-6 bg-[#E8E2D6]/50 rounded-3xl border border-white/60 space-y-4">
          <h4 className="font-bold text-[#3E2F28] leading-tight">Help spread the knowledge of Islam</h4>
          <p className="text-[10px] text-[#3E2F28]/60 leading-relaxed font-medium">
            Your regular support helps us reach our religious brothers and sisters with the message of Islam. Join our mission and be part of the big change.
          </p>
          <button className="w-full py-3 bg-[#8B6E4E] text-white rounded-xl text-xs font-bold shadow-lg hover:shadow-xl transition-all">
            Support Us
          </button>
        </div>
      </div>
    </div>
  );
}
