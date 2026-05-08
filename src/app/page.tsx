import { LeftSidebar } from "@/components/shared/LeftSidebar";
import { TopNavbar } from "@/components/shared/TopNavbar";
import { SurahSidebar } from "@/features/surah/components/SurahSidebar";
import { SettingsPanel } from "@/features/settings/components/SettingsPanel";
import { AyahReader } from "@/features/ayah/components/AyahReader";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-background selection:bg-accent/30 overflow-hidden">
      {/* Fixed Sidebars */}
      <LeftSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />
        
        <div className="flex-1 flex overflow-hidden">
          <SurahSidebar />
          
          <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
            <AyahReader />
          </div>

          <SettingsPanel />
        </div>
      </div>
    </main>
  );
}
