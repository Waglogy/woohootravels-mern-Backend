import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  travelers: {
    type: Number,
    required: true
  },
  children: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'cancelled'],
    default: 'active'
  }
},
{ timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);