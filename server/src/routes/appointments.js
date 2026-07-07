import { Router } from "express";
import Appointment from "../models/Appointment.js";
import { auth, adminOnly } from "../middleware/auth.js";

const router = Router();
router.use(auth);

// Current user's appointments
router.get("/", async (req, res, next) => {
  try {
    const appts = await Appointment.find({ userId: req.user._id })
      .populate("petId serviceId")
      .sort("-date");
    res.json(appts);
  } catch (e) { next(e); }
});

// Book a new appointment
router.post("/", async (req, res, next) => {
  try {
    const { petId, serviceId, date, time } = req.body;
    const appt = await Appointment.create({ userId: req.user._id, petId, serviceId, date, time });
    res.status(201).json(appt);
  } catch (e) { next(e); }
});

// Cancel own appointment
router.patch("/:id/cancel", async (req, res, next) => {
  try {
    const appt = await Appointment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status: "Cancelled" },
      { new: true },
    );
    if (!appt) return res.status(404).json({ message: "Not found" });
    res.json(appt);
  } catch (e) { next(e); }
});

// Admin: list all + delete
router.get("/all", adminOnly, async (_req, res, next) => {
  try { res.json(await Appointment.find().populate("userId petId serviceId").sort("-date")); }
  catch (e) { next(e); }
});

router.delete("/:id", adminOnly, async (req, res, next) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
