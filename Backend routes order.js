import express from "express";
import Order from "../models/Order.js";
import Food from "../models/Food.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  let total = 0;

  for (let item of req.body.items) {
    const food = await Food.findById(item.foodId);
    if (!food || food.stock < item.quantity)
      return res.status(400).json("Out of stock");

    total += food.price * item.quantity;
    food.stock -= item.quantity;
    await food.save();
  }

  const order = await Order.create({
    user: req.user.id,
    items: req.body.items,
    totalAmount: total
  });

  res.json(order);
});

router.get("/", verifyToken, isAdmin, async (req, res) => {
  const orders = await Order.find().populate("user").populate("items.food");
  res.json(orders);
});

export default router;
