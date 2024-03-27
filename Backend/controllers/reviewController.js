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
  if (!req.user) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized User. Invalid token. Login Again...!",
    });
  }
  const eventId = req.params.eventId;
  const {
    reviewContent,
    registrationExperience,
    eventExperience,
    breakfastExperience,
    overallRating,
  } = req.body;
  const userId = req.user._id;
  try {
    // Implement review submission logic
    if (
      !reviewContent ||
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
      reviewContent,
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
  // Implement report review logic
  if (!req.user) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized User. Invalid token. Login Again...!",
    });
  }

  const reviewId = req.params.id;
  try {
    const review = await ReviewModel.findById({ _id: reviewId });
    if (!review) {
      return res
        .status(404)
        .json({ status: "failed", message: "Review not found" });
    }
    // Increment the reports count
    review.reports++;
    // If a review is reported more than 5 times, flag it
    if (review.reports >= 5) {
      review.flagged = true;
    }
    await review.save();
    res
      .status(200)
      .json({ status: "success", message: "Review reported successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error." });
  }
};

// Implement response to review logic: Make sure that only the event organizer can respond to a review
export const respondToReview = async (req, res) => {
  if (!req.organizer) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized Organizer. Invalid token. Login Again...!",
    });
  }
  const reviewId = req.params.id;
  const { response } = req.body;
  try {
    if (!response) {
      return res.status(400).json({
        status: "failed",
        message: "Response is required to respond to a review",
      });
    }
    const review = await ReviewModel.findById({ _id: reviewId });
    if (!review) {
      return res
        .status(404)
        .json({ status: "failed", message: "Review not found" });
    }
    review.response = response;
    await review.save();
    res.status(200).json({
      status: "success",
      message: "Response of review by organizer added successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error." });
  }
};

export const getReviewSummary = async (req, res) => {
  // Implement get review summary logic for a particular event
  if (!req.user) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized User. Invalid token. Login Again...!",
    });
  }
  const eventId = req.params.eventId;
  try {
    const reviews = await ReviewModel.find({ eventId: eventId });
    if (!reviews || reviews.length === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "No reviews found for this event" });
    }
    const totalReviews = reviews.length;
    const averageOverallRating =
      reviews.reduce((acc, review) => acc + review.overallRating, 0) /
      totalReviews;
    res.status(200).json({
      status: "success",
      message: "Review summary fetched successfully",
      totalReviews,
      averageOverallRating,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error." });
  }
};

export const getRatingForCriteria = async (req, res) => {
  // Implement get rating for criteria logic for a particular event (event wise)
  if (!req.user) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized User. Invalid token. Login Again...!",
    });
  }
  const eventId = req.params.eventId;
  console.log("eventId", eventId);
  try {
    const reviews = await ReviewModel.find({ eventId: eventId });
    if (!reviews || reviews.length === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "No reviews found for this event" });
    }
    // Now calculate the average rating for each criteria
    const totalReviews = reviews.length;
    const registrationExperience =
      reviews.reduce((acc, review) => acc + review.registrationExperience, 0) /
      totalReviews;
    const eventExperience =
      reviews.reduce((acc, review) => acc + review.eventExperience, 0) /
      totalReviews;
    const breakfastExperience =
      reviews.reduce((acc, review) => acc + review.breakfastExperience, 0) /
      totalReviews;

    res.status(200).json({
      status: "success",
      message:
        "Overall rating for different criteria for a particular event fetched successfully",
      registrationExperience,
      eventExperience,
      breakfastExperience,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error." });
  }
};
