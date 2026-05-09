import { Request, Response, Router } from "express";
import db from "../db/database";

const router = Router();

// GET /api/search?q=mercy
router.get("/", (req: Request, res: Response) => {
  const q = String(req.query.q || "");
  if (q.length < 2) {
    res.json({ search: { results: [] } });
    return;
  }

  try {
    const rows = db
      .prepare(
        `
      SELECT a.verse_key, a.text_madani, a.translation_text
      FROM ayahs_fts f
      JOIN ayahs a ON a.verse_key = f.verse_key
      WHERE ayahs_fts MATCH ?
      LIMIT 20
    `,
      )
      .all(`"${q}"`);
    res.json({ search: { results: rows } });
  } catch {
    const rows = db
      .prepare(
        `
      SELECT verse_key, text_madani, translation_text FROM ayahs
      WHERE translation_text LIKE ? OR text_madani LIKE ?
      LIMIT 20
    `,
      )
      .all(`%${q}%`, `%${q}%`);
    res.json({ search: { results: rows } });
  }
});

export default router;
