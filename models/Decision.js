import mongoose, { model, Schema, models } from "mongoose";

const DecisionSchema = new Schema({
  _id: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Decision = models.Decision || model("Decision", DecisionSchema);
