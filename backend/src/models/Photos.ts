// models/Photo.js
import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: String,
  mimeType: String,
  size: Number,
  url: String,
  date: Date,
  description: String,
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false // Remove o campo __v
});

export default mongoose.model('Photo', PhotoSchema);
