import { Router } from "express";
import User from "../models/User.js";
import Pet from "../models/Pet.js";
import { auth, adminOnly } from "../middleware/auth.js";

const router = Router();
router.use(auth, adminOnly);

router.get("/", async (_req, res, next) => {
  try { res.json(await User.find().select("-password").sort("-createdAt")); }
  catch (e) { next(e); }
});

router.get("/pets", async (_req, res, next) => {
  try { res.json(await Pet.find().populate("userId", "name email")); }
  catch (e) { next(e); }
});

export default router;
