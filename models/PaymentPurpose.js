import mongoose, { model, Schema, models } from "mongoose";

const PaymentPurposeSchema = new Schema({
  _id: String,
  name: String,
  serial: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const PaymentPurpose = models.PaymentPurpose || model("PaymentPurpose", PaymentPurposeSchema);
