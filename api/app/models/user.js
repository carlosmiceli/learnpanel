import mongoose from "mongoose";
import contentSchema from "./content.js"

const userSchema = mongoose.model("Users", new mongoose.Schema({
    name: {
      type: String,
      required: true,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"]
    },
    content: [contentSchema]
  })
);

export default userSchema