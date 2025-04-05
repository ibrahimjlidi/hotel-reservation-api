import Chambre from '../models/Chambre.js';

// Create a new chambre (room)
export const createChambre = async (req, res) => {
  try {
    const { numCh, typeCh, imageCh, tarif } = req.body;
    
    const newChambre = new Chambre({
      numCh,
      typeCh,
      imageCh,
      tarif,
    });

    await newChambre.save();
    res.status(201).json({ message: 'Chambre created successfully!', newChambre });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create chambre', error });
  }
};

// Get all chambres (rooms)
export const getAllChambres = async (req, res) => {
  try {
    const chambres = await Chambre.find();
    res.status(200).json(chambres);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch chambres', error });
  }
};

// Get a chambre by ID
export const getChambreById = async (req, res) => {
  try {
    const chambre = await Chambre.findById(req.params.chambreId);
    if (!chambre) {
      return res.status(404).json({ message: 'Chambre not found.' });
    }
    res.status(200).json(chambre);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch chambre', error });
  }
};

// Update a chambre by ID
export const updateChambre = async (req, res) => {
  try {
    const { chambreId } = req.params;
    const { numCh, typeCh, imageCh, tarif } = req.body;

    const chambre = await Chambre.findById(chambreId);
    if (!chambre) {
      return res.status(404).json({ message: 'Chambre not found.' });
    }

    chambre.numCh = numCh || chambre.numCh;
    chambre.typeCh = typeCh || chambre.typeCh;
    chambre.imageCh = imageCh || chambre.imageCh;
    chambre.tarif = tarif || chambre.tarif;

    await chambre.save();
    res.status(200).json({ message: 'Chambre updated successfully!', chambre });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update chambre', error });
  }
};

// Delete a chambre by ID
export const deleteChambre = async (req, res) => {
  try {
    const { chambreId } = req.params;

    const chambre = await Chambre.findById(chambreId);
    if (!chambre) {
      return res.status(404).json({ message: 'Chambre not found.' });
    }

    await chambre.remove();
    res.status(200).json({ message: 'Chambre deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete chambre', error });
  }
};
