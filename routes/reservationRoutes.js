import express from 'express';
import { createReservation, getReservationsByUser, getAllReservations, updateReservationStatus, cancelReservation, deleteReservation } from '../controllers/reservationController.js';

const router = express.Router();

// Create a reservation
router.post('/reservation', createReservation);

// Get all reservations for a user
router.get('/reservations/user/:userId', getReservationsByUser);

// Get all reservations (admin or hotel manager)
router.get('/reservations', getAllReservations);

// Update reservation status
router.put('/reservation/:reservationId/status', updateReservationStatus);

// Cancel a reservation
router.put('/reservation/:reservationId/cancel', cancelReservation);

// Delete a reservation by ID
router.delete('/reservation/:reservationId', deleteReservation);

export default router;
