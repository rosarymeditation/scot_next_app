import mongoose, { model, Schema, models } from "mongoose";

const HighSchoolQualificationSchema = new Schema({
  _id: String,
  highSchoolName: String,
  completionYear: String,
  userId: { type: String, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const HighSchoolQualification =
  models.HighSchoolQualification ||
  model("HighSchoolQualification", HighSchoolQualificationSchema);
