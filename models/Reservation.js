import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },      // Refers to the user
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },    // Refers to the hotel
  chambreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chambre', required: true }, // Refers to the chambre (room)
  checkInDate: { type: Date, required: true },  // Check-in date
  checkOutDate: { type: Date, required: true }, // Check-out date
  totalPrice: { type: Number, required: true }, // Total price for the reservation
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' } // Reservation status
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
