import mongoose from 'mongoose';

const chambreSchema = new mongoose.Schema({
  numCh: { type: String, required: true },        
  typeCh: { type: String, required: true },       
  imageCh: { type: String, required: true },      
  tarif: { type: Number, required: true },
  description: { type: String, required: true },
 nbLits: { type: Number, required: true },
}, { timestamps: true });

const Chambre = mongoose.model('Chambre', chambreSchema);

export default Chambre;
