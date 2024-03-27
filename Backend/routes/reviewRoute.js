import express from "express";
import checkUserAuth from "../middlewares/userAuth.js";
import {
  getRatingForCriteria,
  getReviewSummary,
  getReviews,
  likeReview,
  reportReview,
  respondToReview,
  submitReview,
} from "../controllers/reviewController.js";
import checkOrganizerAuth from "../middlewares/organizerAuth.js";
const router = express.Router();

// Adding Middleware to check user authentication and authorization and then calling the respective controller functions
// Adding Middleware to check organizer authentication and authorization and then calling the respective controller functions

router.route("/:eventId/get-reviews").get(checkUserAuth, getReviews);

router.route("/:eventId/submit-review").post(checkUserAuth, submitReview);

router.route("/:eventId/like-review/:id").post(checkUserAuth, likeReview);

router.route("/:eventId/report-review/:id").post(checkUserAuth, reportReview);

// This route accessed by only authenticated organizer
router
  .route("/:eventId/respond-review/:id")
  .post(checkOrganizerAuth, respondToReview);

router.route("/:eventId/reviews-summary").get(checkUserAuth, getReviewSummary);
router
  .route("/:eventId/review-ratings-for-criteria")
  .get(checkUserAuth, getRatingForCriteria);

export default router;
