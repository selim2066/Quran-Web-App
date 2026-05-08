import React from "react";
import { fetchSurahs } from "@/features/surah/services/quranApi";
import { TopNavbar } from "@/components/shared/TopNavbar";
import { LeftSidebar } from "@/components/shared/LeftSidebar";
import { MobileNav } from "@/components/shared/MobileNav";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/shared/HeroSection";
import { SurahGrid } from "@/components/shared/SurahGrid";

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const surahs = await fetchSurahs();

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <TopNavbar />
      
      <div className="flex flex-1 relative">
        <LeftSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          <HeroSection />
          
          <div className="container mx-auto px-6 py-16">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Explore Surahs</h2>
                <p className="text-muted-foreground font-medium">Read and study the 114 chapters of the Holy Quran</p>
              </div>
              <div className="hidden md:flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary/60">
                <span>Total 114 Chapters</span>
              </div>
            </div>
            
            <SurahGrid surahs={surahs} />
          </div>
          
          <Footer />
        </div>
      </div>

      <MobileNav />
    </main>
  );
}
