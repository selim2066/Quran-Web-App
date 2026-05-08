"use client";

import React from "react";
import { Home, LayoutGrid, Compass, Bookmark, Settings, Info } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutGrid, label: "Surahs", href: "/surahs" },
  { icon: Compass, label: "Discover", href: "/discover" },
  { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="flex flex-col items-center gap-4 p-4 bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl"
      >
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mb-4">
          <span className="text-primary-foreground font-bold text-xl">Q</span>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.label} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "p-3 rounded-xl transition-colors relative group",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon size={22} />
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                    {item.label}
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute -left-1 top-1/4 bottom-1/4 w-1 bg-accent rounded-full"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8">
          <button className="p-3 text-muted-foreground hover:text-foreground transition-colors">
            <Info size={22} />
          </button>
        </div>
      </motion.div>
    </aside>
  );
}
