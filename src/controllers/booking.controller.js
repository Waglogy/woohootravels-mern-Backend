import Booking from "../models/booking.model.js";

/*  CREATE BOOKING */

export const createBooking = async (req, res) => {
  try {

    const { name, email, phone, date, destination, travelers, children } = req.body;

    // Required fields validation
    if (!name || !email || !phone || !date || !destination || !travelers) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // Travelers validation
    if (!Number.isInteger(travelers) || travelers <= 0) {
      return res.status(400).json({
        success: false,
        message: "Travelers must be a positive integer"
      });
    }

    // Children validation (optional)
    if (children !== undefined && (!Number.isInteger(children) || children < 0)) {
      return res.status(400).json({
        success: false,
        message: "Children must be a non-negative integer"
      });
    }

    // Date validation
    const bookingDate = new Date(date);

    if (isNaN(bookingDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD"
      });
    }

    const booking = await Booking.create({
      name,
      email,
      phone,
      date: bookingDate,
      destination,
      travelers,
      children
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


/* 
   GET BOOKING BY ID
 */

export const getBooking = async (req, res) => {
  try {

    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      booking
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


/* 
   CANCEL BOOKING
 */

export const cancelBooking = async (req, res) => {
  try {

    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled"
      });
    }

    booking.status = "cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};