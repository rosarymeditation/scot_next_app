import mongoose, { model, Schema, models } from "mongoose";

const ChatSchema = new Schema(
  {
    isMe: Boolean,
    message: String,
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    userId: { type: String, ref: "Chat" },
  },
  { _id: false }
);

export const Chat = models.Chat || model("Chat", ChatSchema);
