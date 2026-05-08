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

export default function Home() {
  const [view, setView] = useState<"landing" | "reading">("landing");

  return (
    <main className="flex flex-col min-h-screen bg-[#F4EFE6] selection:bg-[#8B6E4E]/30">
      <TopNavbar />
      
      {view === "landing" ? (
        <>
          <LandingPage />
          <Footer />
          <button 
            onClick={() => setView("reading")}
            className="fixed bottom-10 right-10 z-50 px-8 py-4 bg-[#8B6E4E] text-white rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Start Reading →
          </button>
        </>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 flex overflow-hidden">
              <SurahSidebar />
              <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
                <AyahReader />
              </div>
              <SettingsPanel />
            </div>
          </div>
          <AudioPlayer />
        </div>
      )}

      <MobileNav />
    </main>
  );
}
