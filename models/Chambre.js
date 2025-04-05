import mongoose from 'mongoose';

const chambreSchema = new mongoose.Schema({
  numCh: { type: String, required: true },        // Room number
  typeCh: { type: String, required: true },       // Room type (e.g., Single, Double)
  imageCh: { type: String, required: true },      // URL to the room image
  tarif: { type: Number, required: true },        // Room rate per day (tarif)
}, { timestamps: true });

const Chambre = mongoose.model('Chambre', chambreSchema);

export default Chambre;
