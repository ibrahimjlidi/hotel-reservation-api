import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  idHotel: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true
  },
  nomh: {
    type: String,
    required: true,
    trim: true
  },
  numTelephone: {
    type: String,
    required: true,
    trim: true
  },
  categories: {
    type: String,
    required: true,
    enum: [
      '1 étoile',
      '2 étoiles',
      '3 étoiles',
      '4 étoiles',
      '5 étoiles',
      'Boutique',
      'Luxueux'
    ]
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  chambres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chambre'
    }
  ]
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
