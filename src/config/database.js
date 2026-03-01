import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}
