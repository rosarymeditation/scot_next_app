import mongoose, { model, Schema, models } from "mongoose";

const ApplicationSchema = new Schema({
  _id: String,
  hasSubmitted: Boolean,
  hasDeleted: Boolean,
  stage: String,
  decision: String,
  degreeTypeOne: String,
  degreeTypeTwo: String,
  cityId: Number,
  courseOne: String,
  courseTwo: String,
  institutionOne: String,
  institutionTwo: String,
  userId: { type: String, ref: "User" },
  eligibilityCheck: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  hasSubmitted: Boolean,
  hasApplied: Boolean,
  hasPaid: Boolean,
  hasDecided: Boolean,
  hasCAS: Boolean,
  hasDeleted: Boolean,
  decision: String,
  refNo: String,
  regDate: String,
  credential: String,
  canShow: Boolean,
  device: String,
  description: String,
  cityId: { type: String, ref: "City" },
  degreeTypeId: { type: String, ref: "DegreeType" },
  decisionId: { type: String, ref: "Decision" },
  visaApplyStatusId: {
    type: String,
    ref: "VisaApplyStatus",
  },
  userId: { type: String, ref: "User" },
});

export const Application =
  models.Application || model("Application", ApplicationSchema);
