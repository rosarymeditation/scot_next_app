import mongoose, { model, Schema, models } from "mongoose";

const RelationshipSchema = new Schema({
  _id: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Relationship =
  models.Relationship || model("Relationship", RelationshipSchema);
