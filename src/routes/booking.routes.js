import express from "express";
import {
  createBooking,
  getBooking,
  cancelBooking
} from "../controllers/booking.controller.js";

const router = express.Router();

// Create booking
router.post("/", createBooking);

// Get booking by id
router.get("/:id", getBooking);

// Cancel booking
router.delete("/:id", cancelBooking);

export default router;