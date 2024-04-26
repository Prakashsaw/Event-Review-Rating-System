import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    reviewId: {
      type: String,
      required: true,
      unique: true,
    },
    eventId: {
      type: String,
      ref: "Event",
      required: true,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    reviewContent: { type: String, required: true },
    registrationExperience: { type: Number, min: 1, max: 5 },
    eventExperience: { type: Number, min: 1, max: 5 },
    breakfastExperience: { type: Number, min: 1, max: 5 },
    overallRating: { type: Number, min: 1, max: 5 },
    likes: { type: Number, default: 0 },
    reports: { type: Number, default: 0 },
    flagged: { type: Boolean, default: false },
    response: { type: String },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("Review", reviewSchema);

export default ReviewModel;
