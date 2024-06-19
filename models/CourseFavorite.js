import mongoose, { model, Schema, models } from "mongoose";

const CourseFavoriteSchema = new Schema({
  _id: String,
  userId: String,
  courseId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const CourseFavorite =
  models.CourseFavorite || model("CourseFavorite", CourseFavoriteSchema);
