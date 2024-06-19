import mongoose, { model, Schema, models } from "mongoose";

const DocumentSchema = new Schema({
  _id: String,
  url: String,
  name: String,
  originalName: String,
  userId: { type: String, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Document =
  models.Document || model("Document", DocumentSchema);
