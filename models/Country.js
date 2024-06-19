import mongoose, { model, Schema, models } from "mongoose";

const CountrySchema = new Schema({
  _id: Number,
  name: String,
  code: String,
  code2: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Country = models.Country || model("Country", CountrySchema);
