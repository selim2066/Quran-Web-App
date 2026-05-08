"use client";

import React from "react";
import { Search, Bell, User, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/60 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold tracking-tight text-foreground"
          >
            Quran <span className="text-accent">Mazid</span>
          </motion.h1>
        </div>

        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search surahs, translations..."
              className="w-full bg-secondary/50 border border-transparent focus:border-accent/30 focus:bg-card px-10 py-2 rounded-full text-sm outline-none transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <kbd className="px-1.5 py-0.5 bg-muted text-[10px] rounded border border-border shadow-sm">⌘</kbd>
              <kbd className="px-1.5 py-0.5 bg-muted text-[10px] rounded border border-border shadow-sm">K</kbd>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-full hover:bg-secondary transition-colors relative">
            <Heart size={20} className="text-muted-foreground hover:text-red-500 transition-colors" />
          </button>
          <button className="px-4 py-2 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground rounded-full text-sm font-medium transition-all flex items-center gap-2">
            <Heart size={16} fill="currentColor" />
            <span>Support Us</span>
          </button>
          <div className="h-8 w-[1px] bg-border mx-2" />
          <button className="p-1 rounded-full border-2 border-border/50 hover:border-accent transition-colors">
            <div className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center">
              <User size={16} className="text-muted-foreground" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
