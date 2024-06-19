import mongoose, { model, Schema, models } from "mongoose";

const PaymentSchema = new Schema({
  _id: String,
  refId: String,
  amount: String,
  status: String,
  stripeSessionId: String,
  other: String,
  userId: { type: String, ref: "User" },
  paymentPurposeId: { type:String, ref: "PaymentPurpose" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // price: { type: Number, required: true },
  // images: [{ type: String }],
  // category: { type: mongoose.Types.ObjectId, ref: "Category" },
  // properties: { type: Object },
});

export const Payment = models.Payment || model("Payment", PaymentSchema);
