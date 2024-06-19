import mongoose, { model, Schema, models } from "mongoose";

const VisaApplyStatusSchema = new Schema({
  _id: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const VisaApplyStatus = models.VisaApplyStatus || model("VisaApplyStatus", VisaApplyStatusSchema);
