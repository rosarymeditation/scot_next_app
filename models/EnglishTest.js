import mongoose, { model, Schema, models } from "mongoose";

const EnglishTestSchema = new Schema({
  _id: String,
  name: String,
  score: String,
  originalName: String,
  userId: { type: String, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const EnglishTest =
  models.EnglishTest || model("EnglishTest", EnglishTestSchema);
