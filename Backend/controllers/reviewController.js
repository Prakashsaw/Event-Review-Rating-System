// controllers for a particular event for review

import ReviewModel from "../models/reviewModel.js";

// Implementation of the get reviews logic with pagination
export const getReviews = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized User. Invalid token. Login Again...!",
      });
    }

    const { page = 1, limit = 10 } = req.query;
    const reviews = await ReviewModel.find({ eventId })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await ReviewModel.countDocuments();
    res.status(200).json({
      reviews,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error." });
  }
};

export const submitReview = async (req, res) => {
  const eventId = req.params.eventId;
  const {
    registrationExperience,
    eventExperience,
    breakfastExperience,
    overallRating,
  } = req.body;
  const userId = req.user._id;
  try {
    // Implement review submission logic
    if (
      !registrationExperience ||
      !eventExperience ||
      !breakfastExperience ||
      !overallRating
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Give some review for this event before submit.",
      });
    }

    const review = new ReviewModel({
      eventId,
      userId,
      registrationExperience,
      eventExperience,
      breakfastExperience,
      overallRating,
    });
    await review.save();

    res.status(200).json({
      status: "success",
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error." });
  }
};

export const likeReview = async (req, res) => {
  const reviewId = req.params.id;
  const eventId = req.params.eventId;

  try {
    // Implement like review logic: If a user likes a review(means click on like buttton call this API), increment the likes count
    if (!req.user) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized User. Invalid token. Login Again...!",
      });
    }
    const review = await ReviewModel.findById({ _id: reviewId });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    review.likes++;
    await review.save();

    res.status(200).json({
      status: "success",
      message: "Review liked successfully",
      review,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error." });
  }
};

export const reportReview = async (req, res) => {
  try {
    // Implement report review logic
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error." });
  }
};

export const respondToReview = async (req, res) => {
  try {
    // Implement response to review logic
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error." });
  }
};

export const getReviewSummary = async (req, res) => {
  try {
    // Implement get review summary logic
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error." });
  }
};

export const getRatingForCriteria = async (req, res) => {
  try {
    // Implement get rating for criteria logic
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error." });
  }
};
