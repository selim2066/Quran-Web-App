"use client";

import React from "react";
import Link from "next/link";
import { SearchDialog } from "@/features/search/components/SearchDialog";
import { Settings, Sun, Heart, ChevronDown } from "lucide-react";

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#F4EFE6]/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#8B6E4E] rounded-xl flex items-center justify-center text-white shadow-lg">
            <span className="font-bold text-xl">Q</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#3E2F28]">Quran Mazid</h1>
            <p className="text-[10px] text-[#8B6E4E] font-medium leading-none">Read, Study, and Learn The Quran</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#3E2F28]/70">
          <Link href="/" className="hover:text-[#8B6E4E] transition-colors">Home</Link>
          <Link href="/read" className="text-[#8B6E4E] font-bold border-b-2 border-[#8B6E4E] pb-1">Read Quran</Link>
          <Link href="/prayer-times" className="hover:text-[#8B6E4E] transition-colors">Prayer Time</Link>
          <Link href="/ramadan" className="hover:text-[#8B6E4E] transition-colors">Ramadan 2026</Link>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#8B6E4E] transition-colors">
            <span>Others</span>
            <ChevronDown size={14} />
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full bg-[#E8E2D6] text-[#3E2F28]/60 hover:text-[#8B6E4E] transition-all">
            <Sun size={20} />
          </button>
          <button className="p-2 rounded-full bg-[#E8E2D6] text-[#3E2F28]/60 hover:text-[#8B6E4E] transition-all">
            <Settings size={20} />
          </button>
          <button className="px-6 py-2.5 bg-[#8B6E4E] text-white rounded-full text-sm font-bold shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
            <span>Support Us</span>
            <Heart size={16} fill="currentColor" />
          </button>
        </div>
      </div>
    </header>
  );
}
