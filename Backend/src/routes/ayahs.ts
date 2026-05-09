import { Router, Request, Response } from "express";
import db from "../db/database";

const router = Router();

// GET /api/ayahs/:surahId
router.get("/:surahId", (req: Request, res: Response) => {
  const surahId = parseInt(req.params["surahId"] as string);
  const rows = db
    .prepare("SELECT * FROM ayahs WHERE surah_id = ? ORDER BY verse_number")
    .all(surahId);
  if (!rows.length) {
    res.status(404).json({ error: "No ayahs found" });
    return;
  }
  res.json({ verses: rows });
});

export default router;