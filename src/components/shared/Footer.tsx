"use client";

import React from "react";
import { MessageCircle, Share2, Globe, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#E8E2D6] pt-20 pb-10 border-t border-border/20 relative overflow-hidden">
      {/* Decorative Wave Silhouette */}
      <div className="absolute top-0 left-0 right-0 h-20 -translate-y-full pointer-events-none opacity-5">
         <svg width="100%" height="100%" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,100 C360,0 1080,0 1440,100 Z" fill="#3E2F28" />
         </svg>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-1 space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-[#8B6E4E] rounded-lg flex items-center justify-center text-white">
                <span className="font-bold">Q</span>
             </div>
             <div>
               <h3 className="font-bold text-[#3E2F28]">Quran Mazid</h3>
               <p className="text-[10px] text-[#8B6E4E]">Read, Study, and Learn The Quran</p>
             </div>
          </div>
          <p className="text-sm text-[#3E2F28]/60 leading-relaxed">
            IRD Foundation is providing Islamic apps for the benefit of Mankind, expecting rewards from Allah Subhanawa ta'ala alone and following the Madhab & Manhaz of Salaf-e-Salehin.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-[#3E2F28]">Other Pages</h4>
          <ul className="space-y-3 text-sm text-[#3E2F28]/60">
            <li><a href="#" className="hover:text-[#8B6E4E] transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-[#8B6E4E] transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#8B6E4E] transition-colors">Our Projects</a></li>
            <li><a href="#" className="hover:text-[#8B6E4E] transition-colors">Read Quran</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-[#3E2F28]">Important Links</h4>
          <ul className="space-y-3 text-sm text-[#3E2F28]/60">
            <li><a href="#" className="hover:text-[#8B6E4E] transition-colors">IRD Foundation</a></li>
            <li><a href="#" className="hover:text-[#8B6E4E] transition-colors">Quranmazid.com</a></li>
            <li><a href="#" className="hover:text-[#8B6E4E] transition-colors">Dua & Ruqyah</a></li>
            <li><a href="#" className="hover:text-[#8B6E4E] transition-colors">IHadith</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-[#3E2F28]">Follow Us</h4>
          <div className="flex items-center gap-3">
            {[MessageCircle, Share2, Globe, Mail].map((Icon, i) => (
              <button key={i} className="w-10 h-10 rounded-full bg-[#DED7C9] flex items-center justify-center text-[#3E2F28]/60 hover:bg-[#8B6E4E] hover:text-white transition-all">
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-border/20 text-center">
         <p className="text-xs text-[#3E2F28]/40">© 2026 Quran Mazid. All rights reserved.</p>
      </div>
    </footer>
  );
}
