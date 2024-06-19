import mongoose, { model, Schema, models } from "mongoose";

const PhdQualificationSchema = new Schema(
  {
    _id: String,
    name: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }
);

export const PhdQualification = models.PhdQualification || model("PhdQualification", PhdQualificationSchema);
