import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  discount: Number,
  stock: Number,
  description: String,
  image: String,
  isAvailable: { type: Boolean, default: true }
});

export default mongoose.model("Food", foodSchema);
