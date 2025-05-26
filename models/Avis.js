import mongoose from 'mongoose';

const avisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel', 
    required: true,
  },
  chambreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chambre', 
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, 
  },
  comment: {
    type: String,
    required: true,
    trim: true, 
  },
}, {
  timestamps: true, 
});

const Avis = mongoose.model('Avis', avisSchema);

export default Avis;
