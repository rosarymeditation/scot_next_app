import mongoose, { model, Schema, models } from "mongoose";

const DegreeTypeSchema = new Schema(
  {
    _id:String,
    name: String,
    description: String,
    requirements: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }
);

export const DegreeType = models.DegreeType || model("DegreeType", DegreeTypeSchema);
