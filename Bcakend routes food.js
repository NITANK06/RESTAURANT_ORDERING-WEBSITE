import express from "express";
import Food from "../models/Food.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, async (req, res) => {
  const food = await Food.create(req.body);
  res.json(food);
});

router.get("/", async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  const updated = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

export default router;
