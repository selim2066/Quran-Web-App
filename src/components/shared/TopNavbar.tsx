"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SearchDialog } from "@/features/search/components/SearchDialog";
import { Settings, Sun, Moon, Heart, ChevronDown, BookOpen } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface TopNavbarProps {
  onOpenSettings?: () => void;
}

export function TopNavbar({ onOpenSettings }: TopNavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Surah", href: "/surah/1" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border/10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 shadow-lg shadow-green-600/20 group-hover:scale-105 transition-transform">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Quran Mazid
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
                Read, Study, and Learn The Quran
              </p>
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className={cn(
                "text-sm font-bold transition-all whitespace-nowrap",
                pathname === link.href ? "text-primary" : "text-foreground/60 hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/not-found" className="text-sm font-bold text-foreground/60 hover:text-primary whitespace-nowrap">Recitation</Link>
          <Link href="/not-found" className="text-sm font-bold text-foreground/60 hover:text-primary whitespace-nowrap">Translation</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full text-foreground/60 hover:text-primary transition-all"
          >
            {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            onClick={onOpenSettings}
            className="p-2 rounded-full text-foreground/60 hover:text-primary transition-all"
          >
            <Settings size={20} />
          </button>

          <button 
            onClick={() => toast("This feature is coming soon")}
            className="ml-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow-sm hover:opacity-90 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>Support Us</span>
            <Heart size={16} fill="currentColor" />
          </button>
        </div>
      </div>
    </header>
  );
}
