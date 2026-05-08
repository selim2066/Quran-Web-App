"use client";

import React from "react";
import { Home, List, Settings, Search, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchDialog } from "@/features/search/components/SearchDialog";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: List, label: "Surahs", href: "/surahs" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Heart, label: "Support", href: "/support" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

interface MobileNavProps {
  onOpenSurahs?: () => void;
  onOpenSettings?: () => void;
  isReadingView?: boolean;
}

export function MobileNav({ onOpenSurahs, onOpenSettings, isReadingView }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/80 backdrop-blur-xl border-t border-border flex items-center justify-around p-2 pb-safe">
      <Link href="/" className="flex-1">
        <div className={cn("flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground")}>
          <Home size={20} />
          <span className="text-[10px] font-medium">Home</span>
        </div>
      </Link>

      <button onClick={onOpenSurahs} className="flex-1">
        <div className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground">
          <List size={20} />
          <span className="text-[10px] font-medium">Surahs</span>
        </div>
      </button>

      <div className="flex-1 flex justify-center">
        <SearchDialog />
      </div>

      <button onClick={onOpenSettings} className="flex-1">
        <div className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground">
          <Settings size={20} />
          <span className="text-[10px] font-medium">Settings</span>
        </div>
      </button>

      <Link href="/support" className="flex-1">
        <div className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground">
          <Heart size={20} />
          <span className="text-[10px] font-medium">Support</span>
        </div>
      </Link>
    </nav>
  );
}
