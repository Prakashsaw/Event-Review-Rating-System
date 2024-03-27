import express from "express";
import {
  CreateEvent,
  DeleteEvent,
  GetAllEvents,
  GetEventById,
  UpdateEvent,
} from "../controllers/eventController.js";
import checkOrganizerAuth from "../middlewares/organizerAuth.js";
const router = express.Router();

// Apply middleware to check if the organizer is authorized
router.use(checkOrganizerAuth);

router.route("/get-all-events").get(GetAllEvents);
router.route("/get-one-event/:id").get(GetEventById);
router.route("/create-event").post(CreateEvent);
router.route("/update-event/:id").put(UpdateEvent);
router.route("/delete-event/:id").delete(DeleteEvent);

export default router;
