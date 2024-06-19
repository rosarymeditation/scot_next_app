import mongoose, { model, Schema, models } from "mongoose";

const AgentSchema = new Schema({
  _id: String,
  agencyName: String,
  phone: String,
  email: String,
  password: String,
  countryId: { type: Number, ref: "Country" },
  roleId: { type: String, ref: "Role" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Agent = models.Agent || model("Agent", AgentSchema);
