import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ msg: "UNDER_DEV" });
});

export default router;
