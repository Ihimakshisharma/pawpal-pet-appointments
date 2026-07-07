import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: String,
    age: Number,
    gender: { type: String, enum: ["Male", "Female"] },
    vaccinated: { type: Boolean, default: false },
    image: String,
  },
  { timestamps: true },
);

export default mongoose.model("Pet", petSchema);
