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
  const [query, setQuery] = useState("");
  const { setSelectedSurah, setCurrentAyah } = useQuranStore();

  const { data: surahs } = useQuery({
    queryKey: ["surahs"],
    queryFn: fetchSurahs,
  });

  const { data: searchResults, isLoading: isSearching } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (query.length < 3) return null;
      const res = await fetch(`https://api.quran.com/api/v4/search?q=${query}&language=en&size=10`);
      const data = await res.json();
      return data.search.results;
    },
    enabled: query.length >= 3,
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
        <CommandInput 
          placeholder="Search Surahs or Ayahs..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length < 3 ? (
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
          ) : (
            <CommandGroup heading="Search Results">
              {isSearching && <div className="p-4 text-center text-sm text-muted-foreground">Searching...</div>}
              {searchResults?.map((result: any) => (
                <CommandItem 
                  key={result.verse_id}
                  onSelect={() => {
                    const [sId] = result.verse_key.split(":");
                    setSelectedSurah(parseInt(sId));
                    setCurrentAyah(result.verse_key);
                    setOpen(false);
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="text-sm line-clamp-1" dangerouslySetInnerHTML={{ __html: result.text }} />
                    <span className="text-[10px] text-muted-foreground">Surah {result.verse_key}</span>
                  </div>
                </CommandItem>
              ))}
              {!isSearching && searchResults?.length === 0 && (
                <div className="p-4 text-center text-sm text-muted-foreground">No results found.</div>
              )}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
