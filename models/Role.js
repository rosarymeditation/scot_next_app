import mongoose, { model, Schema, models } from "mongoose";

const RoleSchema = new Schema({
  _id: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Role = models.Role || model("Role", RoleSchema);
