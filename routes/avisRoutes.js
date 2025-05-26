import express from 'express';
import { createAvis, getAvisByHotelAndChambre, updateAvis, deleteAvis } from '../controllers/avisController.js';

const router = express.Router();

router.post('/', createAvis);


router.get('/:hotelId/:chambreId', getAvisByHotelAndChambre);


router.put('/:avisId', updateAvis);


router.delete('/:avisId', deleteAvis);

export default router;
