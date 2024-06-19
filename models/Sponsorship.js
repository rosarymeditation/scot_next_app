import mongoose, { model, Schema, models } from "mongoose";

const SponsorshipSchema = new Schema({
  _id: String,
  sponsor: String,
  name: String,
  occupation: String,
  budget: String,
  userId: { type: String, ref: "User" },
  relationshipId: {
    type: String,
    ref: "Relationship",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Sponsorship =
  models.Sponsorship || model("Sponsorship", SponsorshipSchema);
