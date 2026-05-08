import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuranState {
  selectedSurah: number;
  setSelectedSurah: (id: number) => void;
  
  fontSizeArabic: number;
  setFontSizeArabic: (size: number) => void;
  
  fontSizeTranslation: number;
  setFontSizeTranslation: (size: number) => void;
  
  translationLanguage: string;
  setTranslationLanguage: (lang: string) => void;
}

export const useQuranStore = create<QuranState>()(
  persist(
    (set) => ({
      selectedSurah: 1,
      setSelectedSurah: (id) => set({ selectedSurah: id }),
      
      fontSizeArabic: 32,
      setFontSizeArabic: (size) => set({ fontSizeArabic: size }),
      
      fontSizeTranslation: 18,
      setFontSizeTranslation: (size) => set({ fontSizeTranslation: size }),
      
      translationLanguage: "en",
      setTranslationLanguage: (lang) => set({ translationLanguage: lang }),
    }),
    {
      name: "quran-storage",
    }
  )
);
