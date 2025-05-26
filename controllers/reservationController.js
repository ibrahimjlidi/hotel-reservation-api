import mongoose from 'mongoose';
import Reservation from '../models/Reservation.js';
import Chambre from '../models/Chambre.js';

// Create a new reservation
export const createReservation = async (req, res) => {
  try {
    const { userId, hotelId, chambreId, checkInDate, checkOutDate } = req.body;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ message: 'Invalid userId or hotelId.' });
    }

    // Fetch chambre details
    const chambre = await Chambre.findById(chambreId);
    if (!chambre) {
      return res.status(404).json({ message: 'Chambre not found.' });
    }

    // Check valid date range
    const diffDays = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 3600 * 24));
    if (diffDays <= 0) {
      return res.status(400).json({ message: 'Check-out date must be after check-in date.' });
    }

    // Check for overlapping reservations
    const overlappingReservation = await Reservation.findOne({
      chambreId,
      status: { $ne: 'Cancelled' }, // Ignore cancelled reservations
      $or: [
        {
          checkInDate: { $lte: new Date(checkOutDate) },
          checkOutDate: { $gte: new Date(checkInDate) },
        },
      ],
    });

    if (overlappingReservation) {
      return res.status(400).json({ message: 'Cette chambre est déjà réservée à ces dates.' });
    }

    // Calculate total price
    const totalPrice = chambre.tarif * diffDays;

    // Create and save reservation
    const newReservation = new Reservation({
      userId,
      hotelId,
      chambreId,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      totalPrice,
      status: 'Pending',
    });

    await newReservation.save();

    res.status(201).json({ message: 'Reservation created successfully!', newReservation });

  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Failed to create reservation', error: error.message });
  }
};

// Get all reservations for a user
export const getReservationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId.' });
    }

    const reservations = await Reservation.find({ userId })
      .populate('hotelId chambreId', 'nomh numCh'); // Ensure the correct fields are populated

    if (!reservations.length) {
      return res.status(404).json({ message: 'No reservations found for this user.' });
    }

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reservations', error });
  }
};
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('userId hotelId chambreId', 'name nomh numCh');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all reservations', error });
  }
};

export const updateReservationStatus = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Confirmed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

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
export const updateReservationDates = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { checkInDate, checkOutDate } = req.body;

    if (!checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "Missing dates." });
    }

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    reservation.checkInDate = new Date(checkInDate);
    reservation.checkOutDate = new Date(checkOutDate);
    await reservation.save();

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Failed to update reservation dates", error });
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

    await Reservation.deleteOne({ _id: reservationId }); // à la place de reservation.remove()
    res.status(200).json({ message: 'Reservation deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete reservation', error });
  }
};
