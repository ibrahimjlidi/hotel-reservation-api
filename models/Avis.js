import mongoose from 'mongoose';

const avisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel', // Reference to the Hotel model
    required: true,
  },
  chambreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chambre', // Reference to the Chambre model
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Rating can range from 1 to 5
  },
  comment: {
    type: String,
    required: true,
    trim: true, // Remove any extra spaces around the comment
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Avis = mongoose.model('Avis', avisSchema);

export default Avis;
