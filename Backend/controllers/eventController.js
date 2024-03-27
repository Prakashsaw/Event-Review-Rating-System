// All events Controlles : Like Create Event, Update Event, Delete Event, Get All Events, Get Event By ID

import EventModel from "../models/eventModel.js";

export const CreateEvent = async (req, res) => {
  try {
    const { title, description, date, location, image } = req.body;
    if (!title || !description || !date || !location || !image) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    if (!req.organizer) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized Organizer. Invalid token. Login Again...!",
      });
    }
    const isEventAlreadyExist = await EventModel.findOne({
      title,
      organizerId: req.organizer._id,
    });
    if (isEventAlreadyExist) {
      return res.status(400).json({
        status: "failed",
        message: "Event already created with this title.",
      });
    }

    const newEvent = new EventModel({
      title,
      description,
      date,
      location,
      image,
      organizerId: req.organizer._id,
    });

    await newEvent.save();

    res.status(201).json({
      status: "success",
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

// Get all events
export const GetAllEvents = async (req, res) => {
  try {
    if (!req.organizer) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized Organizer. Invalid token. Login Again...!",
      });
    }
    const events = await EventModel.find({ organizerId: req.organizer._id });
    res.status(200).json({
      status: "success",
      message: "All events fetched successfully",
      events,
    });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

// Get event by ID
export const GetEventById = async (req, res) => {
  try {
    if (!req.organizer) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized Organizer. Invalid token. Login Again...!",
      });
    }
    const event = await EventModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Event fetched successfully",
      event,
    });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

// Update event or Reschedule event by ID
export const UpdateEvent = async (req, res) => {
  try {
    if (!req.organizer) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized Organizer. Invalid token. Login Again...!",
      });
    }
    const event = await EventModel.findById(req.params.id);
    if (!event) {
      return res
        .status(404)
        .json({ status: "failed", message: "Event not found" });
    }

    const { title, description, date, location, image } = req.body;
    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (location) event.location = location;
    if (image) event.image = image;

    await event.save();

    res.status(200).json({
      status: "success",
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

// Delete event by ID
export const DeleteEvent = async (req, res) => {
  try {
    if (!req.organizer) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized Organizer. Invalid token. Login Again...!",
      });
    }
    await EventModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};
