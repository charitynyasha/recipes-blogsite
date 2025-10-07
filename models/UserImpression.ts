// models/UserImpression.ts
import mongoose, { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  text: { type: String, required: true },
  author: { type: String, default: null }, // optional
  createdAt: { type: Date, default: () => new Date() }
});

const UserImpressionSchema = new Schema({
  title: String,
  desc: String,
  imgSrc: String,
  type: String,
  time: String,
  people: String,
  level: String,
  likesCount: { type: Number, default: 0 },
  comments: { type: [CommentSchema], default: [] },
  createdAt: { type: Date, default: () => new Date() }
});

// Avoid model recompilation in dev
export default (models.UserImpression as mongoose.Model<any>) ||
  model("UserImpression", UserImpressionSchema);
