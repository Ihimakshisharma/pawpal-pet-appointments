import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  icon: String,
  duration: String,
  price: String,
});

export default mongoose.model("Service", serviceSchema);
