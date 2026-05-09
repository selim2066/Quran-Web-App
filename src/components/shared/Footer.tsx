"use client";

import React from "react";
import { MessageCircle, Share2, Globe, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary pt-20 pb-10 border-t border-border/20 relative overflow-hidden">
      {/* Decorative Wave Silhouette */}
      <div className="absolute top-0 left-0 right-0 h-20 -translate-y-full pointer-events-none opacity-5">
         <svg width="100%" height="100%" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,100 C360,0 1080,0 1440,100 Z" fill="currentColor" className="text-foreground" />
         </svg>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-1 space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                <span className="font-bold">Q</span>
             </div>
             <div>
               <h3 className="font-bold text-foreground">Quran Mazid</h3>
               <p className="text-[10px] text-primary">Read, Study, and Learn The Quran</p>
             </div>
          </div>
          <p className="text-sm text-foreground/60 leading-relaxed">
            IRD Foundation is providing Islamic apps for the benefit of Mankind, expecting rewards from Allah Subhanawa ta'ala alone and following the Madhab & Manhaz of Salaf-e-Salehin.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-foreground">Other Pages</h4>
          <ul className="space-y-3 text-sm text-foreground/60">
            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Our Projects</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Read Quran</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-foreground">Important Links</h4>
          <ul className="space-y-3 text-sm text-foreground/60">
            <li><a href="#" className="hover:text-primary transition-colors">IRD Foundation</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Quranmazid.com</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Dua & Ruqyah</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">IHadith</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-foreground">Follow Us</h4>
          <div className="flex items-center gap-3">
            {[MessageCircle, Share2, Globe, Mail].map((Icon, i) => (
              <button key={i} className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-white transition-all shadow-sm">
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-border/20 text-center">
         <p className="text-xs text-foreground/40">© 2026 Quran Mazid. All rights reserved.</p>
      </div>
    </footer>
  );
}
