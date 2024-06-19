import mongoose, { model, Schema, models } from "mongoose";

const NewsletterSchema = new Schema(
  {
    name: String,
    email: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }
);

export const Newsletter = models.Newsletter || model("Newsletter", NewsletterSchema);
