import mongoose, { model, Schema, models } from "mongoose";

const InstitutionSchema = new Schema({
  _id: String,
  name: String,
  about: String,
  sellingPoint: String,
  logo: String,
  banner: String,
  cityId: { type: String, ref: "City" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Institution =
  models.Institution || model("Institution", InstitutionSchema);
