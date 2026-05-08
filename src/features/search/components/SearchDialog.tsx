"use client";

import React, { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search, BookOpen, Book } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchSurahs } from "../../surah/services/quranApi";
import { useQuranStore } from "@/store/useQuranStore";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const { setSelectedSurah } = useQuranStore();

  const { data: surahs } = useQuery({
    queryKey: ["surahs"],
    queryFn: fetchSurahs,
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border border-border rounded-full hover:bg-secondary/50 transition-all w-full max-w-[200px]"
      >
        <Search size={14} />
        <span>Search...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Surahs">
            {surahs?.map((surah) => (
              <CommandItem 
                key={surah.id}
                onSelect={() => {
                  setSelectedSurah(surah.id);
                  setOpen(false);
                }}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span>{surah.name_complex}</span>
                <span className="ml-auto text-xs text-muted-foreground">{surah.translated_name.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Quick Links">
            <CommandItem>
              <Book className="mr-2 h-4 w-4" />
              <span>Ayatul Kursi</span>
            </CommandItem>
            <CommandItem>
              <Book className="mr-2 h-4 w-4" />
              <span>Surah Yaseen</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
