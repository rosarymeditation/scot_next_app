import mongoose, { model, Schema, models } from "mongoose";

const ContactSchema = new Schema({
  _id: String,
  fullname: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Contact = models.Contact || model("Contact", ContactSchema);
