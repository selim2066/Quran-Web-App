"use client";

import React from "react";
import { Home, LayoutGrid, Send, Bookmark, Settings, Info } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutGrid, label: "Apps", href: "/apps" },
  { icon: Send, label: "Send", href: "/send" },
  { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-20 h-full bg-card border-r border-border hidden lg:flex flex-col items-center py-8 gap-10">
      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
        <span className="text-primary-foreground font-bold text-xl">Q</span>
      </div>

      <nav className="flex flex-col gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-3 rounded-xl transition-all relative group",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground/40 hover:text-primary hover:bg-primary/5"
                )}
              >
                <item.icon size={24} />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] uppercase tracking-tighter">
                  {item.label}
                </div>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button className="p-3 text-foreground/40 hover:text-primary transition-colors">
          <Info size={24} />
        </button>
      </div>
    </aside>
  );
}
