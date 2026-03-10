import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import contactRoutes from './contact.routes.js';
import bookingRoutes from './booking.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/contacts', contactRoutes);
router.use('/bookings', bookingRoutes);

export default router;
