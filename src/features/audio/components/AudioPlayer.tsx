"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, Repeat, Shuffle, ListMusic, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuranStore } from "@/store/useQuranStore";
import { useQuery } from "@tanstack/react-query";
import { fetchSurahs } from "../../surah/services/quranApi";


export function AudioPlayer() {
  const { selectedSurah, currentAyah, setCurrentAyah, setIsAudioActive } = useQuranStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data: surahs } = useQuery({
    queryKey: ["surahs"],
    queryFn: fetchSurahs,
  });

  const currentSurah = surahs?.find(s => s.id === selectedSurah);

  // Audio URL logic
  let audioUrl = "";
  if (currentAyah) {
    const [s, a] = currentAyah.split(":");
    const surahStr = s.padStart(3, "0");
    const ayahStr = a.padStart(3, "0");
    audioUrl = `https://www.everyayah.com/data/Alafasy_128kbps/${surahStr}${ayahStr}.mp3`;
  } else {
    audioUrl = `https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${selectedSurah}.mp3`;
  }

  useEffect(() => {
    if (currentAyah) {
      setIsActive(true);
      setIsPlaying(true);
      setIsAudioActive(true);
    }
  }, [currentAyah]);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
    }
  }, [audioUrl, isPlaying, isActive]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        setIsActive(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p);
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-2xl border-t border-border shadow-[0_-20px_50px_rgba(0,0,0,0.2)]"
        >
          {/* ---- MOBILE BAR ---- */}
          <div className="lg:hidden px-4 py-3 flex items-center gap-3">
            {/* Ayah badge */}
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-sm shrink-0">
              {currentAyah ? currentAyah.split(":")[1] : selectedSurah}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">
                {currentAyah ? `Ayah ${currentAyah}` : currentSurah?.name_complex}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest truncate">
                {currentSurah?.name_complex}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button className="text-muted-foreground hover:text-primary transition-colors p-2">
                <SkipBack size={20} fill="currentColor" />
              </button>
              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-all"
              >
                {isPlaying
                  ? <Pause size={20} fill="currentColor" />
                  : <Play size={20} className="ml-0.5" fill="currentColor" />
                }
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors p-2">
                <SkipForward size={20} fill="currentColor" />
              </button>
              <button
                onClick={() => { setIsActive(false); setIsAudioActive(false); setCurrentAyah(null); }}
                className="text-muted-foreground hover:text-foreground transition-colors p-2"
              >
                <X size={18} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary">
              <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* ---- DESKTOP BAR ---- */}
          <div className="hidden lg:block px-6 py-4">
            <div className="container max-w-7xl mx-auto flex items-center justify-between gap-8">
              {/* ...existing desktop content stays exactly as is... */}
            </div>
          </div>

          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentAyah(null);
              setIsAudioActive(false);
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
