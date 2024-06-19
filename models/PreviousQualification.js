import mongoose, { model, Schema, models } from "mongoose";

const PreviousQualificationSchema = new Schema({
  _id: String,
  pq_grade: String,
  pq_schoolName: String,
  pq_completed: String,
  pq_programmeYear: String,
  userId: { type: String, ref: "User" },
  qualificationType: {
    type: String,
    ref: "QualificationType",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const PreviousQualification =
  models.PreviousQualification ||
  model("PreviousQualification", PreviousQualificationSchema);
