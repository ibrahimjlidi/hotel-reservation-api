import express from 'express';
import { createChambre, getAllChambres, getChambreById, updateChambre, deleteChambre } from '../controllers/chambreController.js';

const router = express.Router();

// Create a chambre (room)
router.post('/chambres', createChambre);

// Get all chambres (rooms)
router.get('/chambres', getAllChambres);

// Get a chambre by ID
router.get('/chambre/:chambreId', getChambreById);

// Update a chambre by ID
router.put('/chambre/:chambreId', updateChambre);

// Delete a chambre by ID
router.delete('/chambre/:chambreId', deleteChambre);

export default router;
