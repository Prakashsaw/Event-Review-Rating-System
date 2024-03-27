import express from "express";
const router = express.Router();

import {
  OrganizerLogin,
  OrganizerSignUp,
} from "../controllers/organizerController.js";

router.route("/signup").post(OrganizerSignUp);

router.route("/login").post(OrganizerLogin);

export default router;
