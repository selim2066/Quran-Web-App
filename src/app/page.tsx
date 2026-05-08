"use client";

import React, { useState } from "react";
import { LeftSidebar } from "@/components/shared/LeftSidebar";
import { TopNavbar } from "@/components/shared/TopNavbar";
import { SurahSidebar } from "@/features/surah/components/SurahSidebar";
import { SettingsPanel } from "@/features/settings/components/SettingsPanel";
import { AyahReader } from "@/features/ayah/components/AyahReader";
import { AudioPlayer } from "@/features/audio/components/AudioPlayer";
import { MobileNav } from "@/components/shared/MobileNav";
import { LandingPage } from "@/components/shared/LandingPage";
import { Footer } from "@/components/shared/Footer";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [view, setView] = useState<"landing" | "reading">("landing");
  const [isSurahSidebarOpen, setIsSurahSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <main className="flex flex-col h-screen bg-background selection:bg-primary/30">
      <TopNavbar onOpenSettings={() => setIsSettingsOpen(true)} />
      
      {view === "landing" ? (
        <div className="flex-1 overflow-y-auto">
          <LandingPage onStartReading={() => setView("reading")} />
          <Footer />
          <button 
            onClick={() => setView("reading")}
            className="fixed bottom-24 right-10 z-50 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Start Reading →
          </button>
        </div>
      ) : (
        <div className="flex flex-1 h-[calc(100vh-4rem)] pb-[88px] md:pb-0">
          <LeftSidebar />
          
          <div className={cn(
            "fixed inset-0 z-50 lg:hidden bg-background/80 backdrop-blur-sm transition-all duration-300",
            isSurahSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}>
            <div className={cn(
              "absolute inset-y-0 left-0 w-80 bg-background shadow-2xl transition-transform duration-300 transform",
              isSurahSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
              <div className="p-4 flex justify-end">
                <button onClick={() => setIsSurahSidebarOpen(false)} className="p-2 text-foreground/40 hover:text-foreground">
                  <X size={24} />
                </button>
              </div>
              <SurahSidebar isMobile onSelect={() => setIsSurahSidebarOpen(false)} />
            </div>
          </div>

          <div className="flex-1 flex flex-col min-w-0 h-full relative">
            <div className="flex-1 flex h-full">
              <SurahSidebar className="hidden xl:flex" />
              <div className="flex-1 overflow-y-auto custom-scrollbar h-full bg-background/5">
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
      )}

      <MobileNav 
        onOpenSurahs={() => setIsSurahSidebarOpen(true)} 
        onOpenSettings={() => setIsSettingsOpen(true)}
        isReadingView={view === "reading"}
      />
    </main>
  );
}
