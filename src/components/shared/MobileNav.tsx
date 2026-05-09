"use client";

import React from "react";
import { Home, List, Settings, Search, Heart, LayoutGrid, Send, Bookmark, Type } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchDialog } from "@/features/search/components/SearchDialog";

import { toast } from "sonner";
import { useQuranStore } from "@/store/useQuranStore";

interface MobileNavProps {
  onOpenSurahs?: () => void;
  onOpenSettings?: () => void;
  isReadingView?: boolean;
}

export function MobileNav({ onOpenSurahs, onOpenSettings, isReadingView }: MobileNavProps) {
  const pathname = usePathname();
  const { isAudioActive } = useQuranStore();

  if (isReadingView && isAudioActive) return null;

  if (isReadingView) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/80 backdrop-blur-xl border-t border-border flex items-center justify-around p-3 pb-safe shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <Link href="/" className="flex-1">
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-primary transition-all">
            <LayoutGrid size={22} />
            <span className="text-[10px] font-bold">Grid</span>
          </div>
        </Link>

        <button onClick={() => toast("Share feature coming soon")} className="flex-1">
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-primary transition-all">
            <Send size={22} />
            <span className="text-[10px] font-bold">Share</span>
          </div>
        </button>

        <button onClick={() => toast("Bookmark added")} className="flex-1">
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-primary transition-all">
            <Bookmark size={22} />
            <span className="text-[10px] font-bold">Bookmark</span>
          </div>
        </button>

        <button onClick={() => toast("Layout toggled")} className="flex-1">
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-primary transition-all">
            <Type size={22} />
            <span className="text-[10px] font-bold">Layout</span>
          </div>
        </button>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/80 backdrop-blur-xl border-t border-border flex items-center justify-around p-2 pb-safe shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      <Link href="/" className="flex-1">
        <div className={cn(
          "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
          pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"
        )}>
          <Home size={20} />
          <span className="text-[10px] font-bold">Home</span>
        </div>
      </Link>

      <button
        onClick={() => {
          if (onOpenSurahs) onOpenSurahs();
          else window.location.href = "/surah/1";
        }}
        className="flex-1"
      >
        <div className={cn(
          "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
          pathname.startsWith("/surah") ? "text-primary" : "text-muted-foreground hover:text-primary"
        )}>
          <List size={20} />
          <span className="text-[10px] font-bold">Surahs</span>
        </div>
      </button>

      <div className="flex-1 flex justify-center -translate-y-4">
        <SearchDialog trigger={
          <button
            className="p-4 bg-primary text-primary-foreground rounded-2xl shadow-xl shadow-primary/30 border-4 border-background"
          >
            <Search size={24} />
          </button>
        } />
      </div>

      <button onClick={onOpenSettings} className="flex-1">
        <div className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-primary transition-all">
          <Settings size={20} />
          <span className="text-[10px] font-bold">Settings</span>
        </div>
      </button>

      <Link href="/not-found" className="flex-1">
        <div className={cn(
          "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
          pathname === "/support" ? "text-primary" : "text-muted-foreground hover:text-primary"
        )}>
          <Heart size={20} />
          <span className="text-[10px] font-bold">Support</span>
        </div>
      </Link>
    </nav>
  );
}
