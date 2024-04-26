// Event Organizer Model
import mongoose from "mongoose";

const organizerSchema = mongoose.Schema(
  {
    organizerId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OrganizerModel = mongoose.model("Organizer", organizerSchema);

export default OrganizerModel;
