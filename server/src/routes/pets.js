import { Router } from "express";
import Pet from "../models/Pet.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.use(auth);

// GET /api/pets — current user's pets
router.get("/", async (req, res, next) => {
  try {
    const pets = await Pet.find({ userId: req.user._id }).sort("-createdAt");
    res.json(pets);
  } catch (err) { next(err); }
});

router.post("/", async (req, res, next) => {
  try {
    const pet = await Pet.create({ ...req.body, userId: req.user._id });
    res.status(201).json(pet);
  } catch (err) { next(err); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const pet = await Pet.findOne({ _id: req.params.id, userId: req.user._id });
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (err) { next(err); }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: req.body },
      { new: true },
    );
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (err) { next(err); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const pet = await Pet.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json({ ok: true });
  } catch (err) { next(err); }
});

export default router;
