import mongoose, { model, Schema, models } from "mongoose";

const TestimonialSchema = new Schema(
  {
    title: String,
    content: String,
    firstname: String,
    url: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    // price: { type: Number, required: true },
    // images: [{ type: String }],
    // category: { type: mongoose.Types.ObjectId, ref: "Category" },
    // properties: { type: Object },
  }
);

export const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);
