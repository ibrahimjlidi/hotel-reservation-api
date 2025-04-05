import express from 'express';
import { createAvis, getAvisByHotelAndChambre, updateAvis, deleteAvis } from '../controllers/avisController.js';

const router = express.Router();

// Route to create a new review (Avis)
router.post('/', createAvis);

// Route to get reviews by hotel and chambre
router.get('/:hotelId/:chambreId', getAvisByHotelAndChambre);

// Route to update a review (Avis)
router.put('/:avisId', updateAvis);

// Route to delete a review (Avis)
router.delete('/:avisId', deleteAvis);

export default router;
