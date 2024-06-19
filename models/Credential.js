import mongoose, { model, Schema, models } from "mongoose";

const CredentialSchema = new Schema({
  _id: String,
  url: String,
  userId: { type: String, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Credential =
  models.Credential || model("Credential", CredentialSchema);
