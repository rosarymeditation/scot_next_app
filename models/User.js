import mongoose, { model, Schema, models } from "mongoose";

const UserSchema = new Schema({
  _id: String,
  intId: Number,
  username: String,
  password: String,
  email: { type: String, unique: true },
  firstname: String,
  middlename: String,
  lastname: String,
  dob: String,
  gender: String,
  marital: String,
  homeAddress: String,
  postalAddress: String,
  contactEmail: String,
  phone: String,
  expiryDate: { type: Date, default: Date.now },
  forgotToken: Boolean,
  regDate: { type: Date, default: Date.now },
  canShow: Boolean,
  photo: String,
  device: String,
  description: String,
  role: { type: String, ref: "Role" },
  agent: { type: String, ref: "Agent" },
  country: { type: String, ref: "Country" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = models.User || model("User", UserSchema);
