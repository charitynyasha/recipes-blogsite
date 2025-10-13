import mongoose from "mongoose";

const { Schema } = mongoose;

// Comment subdocument schema
const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { _id: true }); // Ensure each comment gets its own _id

const recipeAppetizerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  imgSrc: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false,  // Changed to false to allow updates without content
    default: ""       // Added default value
  },
  // New fields for social features
  type: {
    type: String,
    
  },
  time: {
    type: String,
    
  },
  people: {
    type: String,
    
  },
  level: {
    type: String,
    
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  comments: {
    type: [commentSchema],
    default: []
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  validateBeforeSave: true
});

// Index for better query performance
recipeAppetizerSchema.index({ date: -1 });
recipeAppetizerSchema.index({ likes: -1 });

export default mongoose.models.recipeAppetizer || mongoose.model("recipeAppetizer", recipeAppetizerSchema);