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
    <aside className="w-20 h-full bg-card border-r border-border hidden lg:flex flex-col items-center py-8 gap-10">
      <Link href="/">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-all">
          <span className="text-primary-foreground font-bold text-xl">Q</span>
        </div>
      </Link>

      <nav className="flex flex-col gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Content = (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAction(item)}
              className={cn(
                "p-3 rounded-xl transition-all relative group cursor-pointer",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg" 
                  : "text-foreground/40 hover:text-primary hover:bg-primary/5"
              )}
            >
              <item.icon size={24} />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] uppercase tracking-tighter">
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

      <div className="mt-auto space-y-4">
        <button 
          onClick={() => toast("Settings feature coming soon")}
          className="p-3 rounded-xl text-foreground/40 hover:text-primary hover:bg-primary/5 transition-all group relative"
        >
          <Settings size={24} />
          <div className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] uppercase tracking-tighter">
            Settings
          </div>
        </button>
        <button 
          onClick={() => toast("Information about Quran Mazid")}
          className="p-3 rounded-xl text-foreground/40 hover:text-primary hover:bg-primary/5 transition-all group relative"
        >
          <Info size={24} />
          <div className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] uppercase tracking-tighter">
            Info
          </div>
        </button>
      </div>
    </aside>
  );
}
