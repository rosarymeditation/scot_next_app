import mongoose, { model, Schema, models } from "mongoose";

const PhdApplicationSchema = new Schema({
  _id: String,
  firstname: String,
  middlename: String,
  lastname: String,
  email: String,
  phone: String,
  topic: String,
  phdQualificationId: {
    type: String,
    ref: "QualificationQualification",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // price: { type: Number, required: true },
  // images: [{ type: String }],
  // category: { type: mongoose.Types.ObjectId, ref: "Category" },
  // properties: { type: Object },
});

export const PhdApplication =
  models.PhdApplication || model("PhdApplication", PhdApplicationSchema);
