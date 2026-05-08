"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, Repeat, Shuffle, ListMusic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuranStore } from "@/store/useQuranStore";
import { useQuery } from "@tanstack/react-query";
import { fetchSurahs } from "../../surah/services/quranApi";

export function AudioPlayer() {
  const { selectedSurah } = useQuranStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data: surahs } = useQuery({
    queryKey: ["surahs"],
    queryFn: fetchSurahs,
  });

  const currentSurah = surahs?.find(s => s.id === selectedSurah);

  // For now, let's use a sample audio URL or the chapter recitation
  const audioUrl = `https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${selectedSurah}.mp3`;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      if (isPlaying) audioRef.current.play();
    }
  }, [selectedSurah, audioUrl, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p);
    }
  };

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 lg:bottom-0 mb-[64px] lg:mb-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-2xl border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-6 py-4"
    >
      <div className="container mx-auto flex items-center justify-between gap-8">
        {/* Info */}
        <div className="flex items-center gap-4 w-1/4">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent font-bold">
            {selectedSurah}
          </div>
          <div className="hidden md:block">
            <h4 className="text-sm font-bold text-foreground truncate">{currentSurah?.name_complex}</h4>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{currentSurah?.translated_name.name}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col items-center gap-2 max-w-xl">
          <div className="flex items-center gap-6">
            <button className="text-muted-foreground hover:text-accent transition-colors"><Shuffle size={18} /></button>
            <button className="text-foreground hover:text-accent transition-colors"><SkipBack size={22} fill="currentColor" /></button>
            <button 
              onClick={togglePlay}
              className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="ml-1" fill="currentColor" />}
            </button>
            <button className="text-foreground hover:text-accent transition-colors"><SkipForward size={22} fill="currentColor" /></button>
            <button className="text-muted-foreground hover:text-accent transition-colors"><Repeat size={18} /></button>
          </div>

          <div className="w-full flex items-center gap-3">
            <span className="text-[10px] font-mono text-muted-foreground w-10 text-right">0:00</span>
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden relative group cursor-pointer">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-accent" 
                style={{ width: `${progress}%` }}
              />
              <div className="absolute top-0 left-0 bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-accent/20" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground w-10">0:00</span>
          </div>
        </div>

        {/* Extra */}
        <div className="flex items-center justify-end gap-4 w-1/4">
          <div className="flex items-center gap-2">
            <Volume2 size={18} className="text-muted-foreground" />
            <div className="w-20 h-1 bg-secondary rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-foreground/20" />
            </div>
          </div>
          <button className="p-2 text-muted-foreground hover:text-foreground"><ListMusic size={20} /></button>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </motion.div>
  );
}
