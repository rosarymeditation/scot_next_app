import mongoose, { model, Schema, models } from "mongoose";

const QualificationSchema = new Schema({
  _id: String,
  hq_grade: String,
  hq_schoolName: String,
  hq_completed: String,
  hq_programmeYear: String,
  userId: { type: String, ref: "User" },
  qualificationType: {
    type: String,
    ref: "QualificationType",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Qualification =
  models.Qualification || model("Qualification", QualificationSchema);
