"use client";

import React from "react";
import { Home, List, Settings, Search, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: List, label: "Surahs", href: "/surahs" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Heart, label: "Support", href: "/support" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/80 backdrop-blur-xl border-t border-border flex items-center justify-around p-2 pb-safe">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.label} href={item.href} className="flex-1">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-colors",
                isActive ? "text-accent" : "text-muted-foreground"
              )}
            >
              <item.icon size={20} className={cn(isActive && "fill-current")} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="active-dot"
                  className="w-1 h-1 bg-accent rounded-full mt-0.5"
                />
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}
