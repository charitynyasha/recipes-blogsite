import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
  title:   { type: String, required: true },
  content: { type: String, required: true },
  image:   { type: String, required: true },
  author:  { type: String, required: true },
  date:    { type: Date,   default: Date.now },
  // add any other fields like draft, views, etc.
});

// Avoid model name collisions in Next.js dev mode
const BlogPost =
  mongoose.models.BlogPost ||
  mongoose.model("BlogPost", blogSchema);

export default BlogPost;
