import mongoose from "mongoose";

const { Schema } = mongoose;

const VideoRecipeSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  date: { type: Date, default: Date.now },
  imgSrc: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, required: true },
});

// Correct export (avoids recompilation issues in Next.js dev)
export default mongoose.models.VideoRecipes || mongoose.model("VideoRecipes", VideoRecipeSchema);
