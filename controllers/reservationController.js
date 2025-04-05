import mongoose from 'mongoose';

import Reservation from '../models/Reservation.js';
import Chambre from '../models/Chambre.js';

// Create a new reservation
export const createReservation = async (req, res) => {
    try {
      const { userId, hotelId, chambreId, checkInDate, checkOutDate } = req.body;
  
      // Ensure that the userId and hotelId are valid ObjectIds
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const hotelObjectId = new mongoose.Types.ObjectId(hotelId);
  
      // Fetch chambre details to get the price (tarif)
      const chambre = await Chambre.findById(chambreId);
      if (!chambre) {
        return res.status(404).json({ message: 'Chambre not found.' });
      }
  
      // Calculate total price
      const diffDays = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 3600 * 24));
      const totalPrice = chambre.tarif * diffDays;
  
      // Create a new reservation
      const newReservation = new Reservation({
        userId: userObjectId,  // Pass valid ObjectId for user
        hotelId: hotelObjectId,  // Pass valid ObjectId for hotel
        chambreId,
        checkInDate,
        checkOutDate,
        totalPrice,
        status: 'Pending',
      });
  
      await newReservation.save();
      res.status(201).json({ message: 'Reservation created successfully!', newReservation });
    } catch (error) {
      console.error('Error creating reservation:', error);  // Log the full error
      res.status(500).json({ message: 'Failed to create reservation', error: error.message });
    }
  };
// Get all reservations for a user
export const getReservationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Reservation.find({ userId }).populate('hotelId chambreId', 'nomh numCh');

    if (!reservations.length) {
      return res.status(404).json({ message: 'No reservations found for this user.' });
    }

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reservations', error });
  }
};

// Get all reservations for an admin or hotel manager
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('userId hotelId chambreId', 'username nomh numCh');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all reservations', error });
  }
};

// Update reservation status (e.g., confirm or cancel)
export const updateReservationStatus = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status } = req.body;

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    reservation.status = status;
    await reservation.save();

    res.status(200).json({ message: 'Reservation status updated successfully!', reservation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update reservation status', error });
  }
};

// Cancel a reservation
export const cancelReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    reservation.status = 'Cancelled';
    await reservation.save();

    res.status(200).json({ message: 'Reservation cancelled successfully!', reservation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel reservation', error });
  }
};

// Delete a reservation by ID
export const deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    await reservation.remove();
    res.status(200).json({ message: 'Reservation deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete reservation', error });
  }
};
