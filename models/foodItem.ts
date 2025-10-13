import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  username: string;
  text: string;
  timestamp: Date;
}

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

export interface IFoodItem extends Document {
  type: string;
  time: string;
  people: string;
  level: string;
  title: string;
  desc: string;
  imgSrc: string;
  likes: number;
  comments: IComment[];
  date?: Date;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const foodItemSchema = new Schema({
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
foodItemSchema.index({ date: -1 });
foodItemSchema.index({ likes: -1 });

export default mongoose.models.FoodItem || mongoose.model<IFoodItem>('FoodItem', foodItemSchema);