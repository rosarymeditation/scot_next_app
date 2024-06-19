import mongoose, { model, Schema, models } from "mongoose";

const BannerSchema = new Schema({
  url: String,
  title: String,
});

export const Banner = models.Banner || model("Banner", BannerSchema);
