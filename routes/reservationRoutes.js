import express from 'express';
import { 
  createReservation, 
  getReservationsByUser, 
  getAllReservations, 
  updateReservationStatus, 
  cancelReservation, 
  deleteReservation,
  updateReservationDates
} from '../controllers/reservationController.js';
const router = express.Router();
router.get('/reservations', getAllReservations);
router.post('/reservation', createReservation);
router.get('/reservations/user/:userId', getReservationsByUser);
router.put('/:reservationId/status', updateReservationStatus);
router.put('/reservations/:reservationId', updateReservationDates);
router.delete('/reservations/:reservationId', deleteReservation);
export default router;