"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SearchDialog } from "@/features/search/components/SearchDialog";
import { Settings, Sun, Moon, Heart, ChevronDown, BookOpen, Menu, X } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Surah", href: "/surah/1" },
  ];

  return (
    <header className="sticky py-3 top-0 z-40 w-full bg-background border-b border-border/10">
      <div className="container max-w-7xl mx-auto h-16 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          {/* The Icon Container */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <BookOpen className="h-7 w-7 text-white" />
          </div>
          
          {/* The Text Column */}
          <div>
            <h1 className="text-xl font-bold font-serif tracking-tight text-foreground">
              Quran Mazid
            </h1>
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
              Read, Study, and Learn The Quran
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 ">
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
          <div className="hidden md:flex items-center gap-2">
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
              className="ml-4 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-[13px] font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2"
            >
              <span>Support Us</span>
              <Heart size={16} fill="currentColor" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground/60 hover:text-primary transition-all"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={cn(
        "fixed inset-0 top-20 z-50 md:hidden bg-background/80 backdrop-blur-md transition-all duration-300",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "bg-card border-b border-border p-6 space-y-6 transition-transform duration-300 transform",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "text-lg font-bold p-2 rounded-xl transition-all",
                  pathname === link.href ? "bg-primary/10 text-primary" : "text-foreground/60 hover:bg-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/not-found" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold p-2 rounded-xl text-foreground/60 hover:bg-secondary">Recitation</Link>
            <Link href="/not-found" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold p-2 rounded-xl text-foreground/60 hover:bg-secondary">Translation</Link>
          </nav>

          <div className="pt-6 border-t border-border space-y-4">
             <div className="flex items-center justify-between p-2">
                <span className="font-bold text-foreground/60">Theme</span>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 bg-secondary rounded-xl text-primary"
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
             </div>
             <button
              onClick={() => {
                setIsMenuOpen(false);
                toast("Support us coming soon");
              }}
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <span>Support Us</span>
              <Heart size={18} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
