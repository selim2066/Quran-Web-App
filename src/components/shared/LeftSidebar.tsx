"use client";

import React from "react";
import { Home, LayoutGrid, Send, Bookmark, Settings, Info } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { toast } from "sonner";

const navItems = [
  { icon: Home, label: "Home", href: "/", isRoutable: true },
  { icon: LayoutGrid, label: "Apps", href: "/apps", isRoutable: false },
  { icon: Send, label: "Donate", href: "/donate", isRoutable: false },
  { icon: Bookmark, label: "Bookmarks", href: "/bookmarks", isRoutable: false },
];

export function LeftSidebar() {
  const pathname = usePathname();

  const handleAction = (item: any) => {
    if (!item.isRoutable) {
      toast(`${item.label} feature is coming soon`);
    }
  };

  return (
    <aside className="w-16 h-full bg-background border-r border-border/50 hidden lg:flex flex-col items-center py-6 gap-8">
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Content = (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAction(item)}
              className={cn(
                "p-3 rounded-xl transition-all relative group cursor-pointer",
                isActive 
                  ? "text-primary bg-primary/5" 
                  : "text-foreground/40 hover:text-primary hover:bg-primary/5"
              )}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}

              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] uppercase tracking-tighter shadow-xl">
                {item.label}
              </div>
            </motion.div>
          );

          if (item.isRoutable) {
            return <Link key={item.label} href={item.href}>{Content}</Link>;
          }

          return <div key={item.label}>{Content}</div>;
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <button 
          onClick={() => toast("Settings coming soon")}
          className="p-3 rounded-xl text-foreground/40 hover:text-primary hover:bg-primary/5 transition-all group relative"
        >
          <LayoutGrid size={22} />
        </button>
      </div>
    </aside>
  );
}
