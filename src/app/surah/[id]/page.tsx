"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { LeftSidebar } from "@/components/shared/LeftSidebar";
import { TopNavbar } from "@/components/shared/TopNavbar";
import { SurahSidebar } from "@/features/surah/components/SurahSidebar";
import { SettingsPanel } from "@/features/settings/components/SettingsPanel";
import { AyahReader } from "@/features/ayah/components/AyahReader";
import { AudioPlayer } from "@/features/audio/components/AudioPlayer";
import { MobileNav } from "@/components/shared/MobileNav";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuranStore } from "@/store/useQuranStore";

export default function SurahPage() {
  const params = useParams();
  const surahId = parseInt(params.id as string);
  const { setSelectedSurah } = useQuranStore();
  
  const [isSurahSidebarOpen, setIsSurahSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (surahId) {
      setSelectedSurah(surahId);
    }
  }, [surahId, setSelectedSurah]);

  return (
    <main className="flex flex-col h-screen bg-background selection:bg-primary/30">
      <TopNavbar 
        onOpenSettings={() => setIsSettingsOpen(true)} 
        onOpenSurahs={() => setIsSurahSidebarOpen(true)}
        isReadingView={true}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar />
        
        {/* Mobile Surah Sidebar Drawer */}
        <div className={cn(
          "fixed inset-0 z-50 lg:hidden bg-background/80 backdrop-blur-sm transition-all duration-300",
          isSurahSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}>
          <div className={cn(
            "absolute inset-y-0 left-0 w-80 bg-background shadow-2xl transition-transform duration-300 transform",
            isSurahSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <SurahSidebar 
              isMobile 
              onSelect={() => setIsSurahSidebarOpen(false)} 
              onClose={() => setIsSurahSidebarOpen(false)}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0 relative h-full min-h-0">
          <div className="flex-1 flex overflow-hidden h-full min-h-0">
            <SurahSidebar className="hidden xl:flex" />
            <div className="flex-1 overflow-y-auto no-scrollbar md:custom-scrollbar pb-32 min-h-0">
              <AyahReader />
            </div>
            <SettingsPanel className="hidden lg:flex" />
          </div>
        </div>

        {/* Mobile Settings Drawer */}
        <div className={cn(
          "fixed inset-0 z-50 lg:hidden bg-background/80 backdrop-blur-sm transition-all duration-300",
          isSettingsOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}>
          <div className={cn(
            "absolute inset-y-0 right-0 w-80 bg-background shadow-2xl transition-transform duration-300 transform",
            isSettingsOpen ? "translate-x-0" : "translate-x-full"
          )}>
            <div className="p-4 flex justify-start">
              <button onClick={() => setIsSettingsOpen(false)} className="p-2 text-foreground/40 hover:text-foreground">
                <X size={24} />
              </button>
            </div>
            <SettingsPanel isMobile />
          </div>
        </div>

        <AudioPlayer />
      </div>

      <MobileNav 
        onOpenSurahs={() => setIsSurahSidebarOpen(true)} 
        onOpenSettings={() => setIsSettingsOpen(true)}
        isReadingView={true}
      />
    </main>
  );
}
