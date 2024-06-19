import mongoose, { model, Schema, models } from "mongoose";

const CourseSchema = new Schema({
  _id: String,
  name: String,
  description: String,
  duration: String,
  intake: String,
  isPopular: Boolean,
  facultyId: { type: String, ref: "Faculty" },
  degreeTypeId: { type: String, ref: "DegreeType" },
  institutionId: { type: String, ref: "Institution" },
  scholarshipAmount: String,
  time: String,
  thumbnail: String,
  fee: String,
  url: String,
  faculty: String,
  institution: String,
  degreeType: String,
  uniLogo: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Course = models.Course || model("Course", CourseSchema);
