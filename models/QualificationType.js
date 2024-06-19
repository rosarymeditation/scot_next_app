import mongoose, { model, Schema, models } from "mongoose";

const QualificationTypeSchema = new Schema({
  _id: String,
  name: String,
});

export const QualificationType =
  models.QualificationType ||
  model("QualificationType", QualificationTypeSchema);
