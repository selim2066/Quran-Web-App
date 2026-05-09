import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(__dirname, "../data/quran.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS surahs (
    id INTEGER PRIMARY KEY,
    name_arabic TEXT NOT NULL,
    name_complex TEXT NOT NULL,
    translated_name TEXT NOT NULL,
    verses_count INTEGER NOT NULL,
    revelation_place TEXT NOT NULL,
    revelation_order INTEGER NOT NULL,
    bismillah_pre INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS ayahs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    surah_id INTEGER NOT NULL,
    verse_number INTEGER NOT NULL,
    verse_key TEXT NOT NULL UNIQUE,
    text_madani TEXT NOT NULL,
    translation_text TEXT NOT NULL,
    translation_source TEXT NOT NULL DEFAULT 'Saheeh International',
    FOREIGN KEY (surah_id) REFERENCES surahs(id)
  );

  CREATE VIRTUAL TABLE IF NOT EXISTS ayahs_fts
  USING fts5(verse_key, text_madani, translation_text, content=ayahs, content_rowid=id);
`);

export default db;