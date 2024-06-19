import mongoose, { model, Schema, models } from "mongoose";

const CitySchema = new Schema({
  _id: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const City = models.City || model("City", CitySchema);
