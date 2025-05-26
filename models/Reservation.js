import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },     
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },   
  chambreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chambre', required: true }, 
  checkInDate: { type: Date, required: true },  
  checkOutDate: { type: Date, required: true }, 
  totalPrice: { type: Number, required: true }, 
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' } 
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
