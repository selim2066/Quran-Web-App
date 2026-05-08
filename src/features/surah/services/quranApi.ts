const BASE_URL = "https://api.quran.com/api/v4";

export interface Surah {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  translated_name: {
    name: string;
  };
}

export interface Ayah {
  id: number;
  verse_key: string;
  text_uthmani: string;
  translations: {
    text: string;
    resource_name: string;
  }[];
}

export async function fetchSurahs() {
  const res = await fetch(`${BASE_URL}/chapters?language=en`);
  const data = await res.json();
  return data.chapters as Surah[];
}

export async function fetchAyahs(surahId: number) {
  const res = await fetch(
    `${BASE_URL}/verses/by_chapter/${surahId}?language=en&words=true&translations=131&fields=text_uthmani&per_page=300`
  );
  const data = await res.json();
  return data.verses as Ayah[];
}
