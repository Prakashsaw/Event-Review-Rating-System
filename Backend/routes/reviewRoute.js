import express from "express";
import checkUserAuth from "../middlewares/userAuth.js";
import {
  getReviews,
  likeReview,
  submitReview,
} from "../controllers/reviewController.js";
const router = express.Router();

router.use(checkUserAuth);

router.route("/:eventId/get-reviews").get(getReviews);

router.route("/:eventId/submit-review").post(submitReview);

router.route("/:eventId/like-review/:id").post(likeReview);

// router.post("/:id/report", authMiddleware, reviewController.reportReview);
// router.post("/:id/respond", authMiddleware, reviewController.respondToReview);
// router.get("/:id/summary", reviewController.getReviewSummary);
// router.get("/:id/ratings", reviewController.getRatingForCriteria);

export default router;
