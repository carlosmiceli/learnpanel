import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      max: 255,
    },
    url: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      enum: ["texts", "videos"]
    }
});

export default contentSchema