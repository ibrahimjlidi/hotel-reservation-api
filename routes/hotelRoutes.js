import express from 'express';
import {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel
} from '../controllers/hotelController.js';

const router = express.Router();

// POST /api/hotel - create a new hotel
router.post('/', createHotel);

// GET /api/hotel - get all hotels
router.get('/', getHotels);

// GET /api/hotel/:id - get hotel by ID
router.get('/:id', getHotelById);

// PUT /api/hotel/:id - update hotel
router.put('/:id', updateHotel);

// DELETE /api/hotel/:id - delete hotel
router.delete('/:id', deleteHotel);

export default router;
