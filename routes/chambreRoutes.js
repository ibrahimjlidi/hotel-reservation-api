import express from 'express';
import { createChambre, getAllChambres, getChambreById, updateChambre, deleteChambre } from '../controllers/chambreController.js';

const router = express.Router();

router.post('/chambres', createChambre);

router.get('/chambres', getAllChambres);

router.get('/chambre/:chambreId', getChambreById);

router.put('/chambre/:chambreId', updateChambre);

router.delete('/chambre/:chambreId', deleteChambre);

export default router;
