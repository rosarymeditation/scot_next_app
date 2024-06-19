import mongoose, { model, Schema, models } from "mongoose";

const GallerySchema = new Schema({
  _id: String,
  url: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Gallery = models.Gallery || model("Gallery", GallerySchema);
