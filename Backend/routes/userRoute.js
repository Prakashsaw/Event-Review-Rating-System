import express from "express";
import { UserLogin, UserSignUp } from "../controllers/userController.js";

const router = express.Router();

router.route("/signup").post(UserSignUp);
router.route("/login").post(UserLogin);

export default router;
