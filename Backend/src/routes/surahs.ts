import { Router, Request, Response } from "express";
import db from "../db/database";

const router = Router();

// GET /api/surahs
router.get("/", (_req: Request, res: Response) => {
  const rows = db.prepare("SELECT * FROM surahs ORDER BY id").all();
  res.json({ chapters: rows });
});

// GET /api/surahs/:id
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params["id"] as string);
  const row = db.prepare("SELECT * FROM surahs WHERE id = ?").get(id);
  if (!row) {
    res.status(404).json({ error: "Surah not found" });
    return;
  }
  res.json({ chapter: row });
});

export default router;