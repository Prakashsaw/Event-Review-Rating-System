import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
    },
    organizerId: {
      type: String,
      ref: "Organizer",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;
