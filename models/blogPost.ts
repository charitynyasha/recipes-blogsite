import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  // Added fields for dashboard functionality
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  excerpt: { type: String, maxlength: 300 },
  tags: [{ type: String }],
  category: { type: String, default: 'General' },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
}, {
  timestamps: true // This adds createdAt and updatedAt
});

// Avoid model name collisions in Next.js dev mode
const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", blogSchema);

export default BlogPost;