import mongoose, { model, Schema, models } from "mongoose";

const FacultySchema = new Schema({
  _id: String,
  name: String,
  icon: String,
  url: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Faculty = models.Faculty || model("Faculty", FacultySchema);
