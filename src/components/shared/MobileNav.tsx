"use client";

import React from "react";
import { Home, List, Settings, Search, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchDialog } from "@/features/search/components/SearchDialog";

import { toast } from "sonner";

interface MobileNavProps {
  onOpenSurahs?: () => void;
  onOpenSettings?: () => void;
  isReadingView?: boolean;
}

export function MobileNav({ onOpenSurahs, onOpenSettings, isReadingView }: MobileNavProps) {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: List, label: "Surah", href: "/surah/1" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/80 backdrop-blur-xl border-t border-border flex items-center justify-around p-2 pb-safe">
      {navItems.map((item) => (
        <Link key={item.label} href={item.href} className="flex-1">
          <div className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
            pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
          )}>
            <item.icon size={20} />
            <span className="text-[10px] font-bold">{item.label}</span>
          </div>
        </Link>
      ))}

      <div className="flex-1 flex justify-center">
        <button 
          onClick={() => {
            if (onOpenSurahs) onOpenSurahs();
            else toast("Search feature coming soon");
          }}
          className="p-3 bg-primary text-primary-foreground rounded-2xl shadow-lg shadow-primary/20"
        >
          <Search size={24} />
        </button>
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
