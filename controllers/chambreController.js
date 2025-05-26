import Chambre from '../models/Chambre.js';
import mongoose from 'mongoose';
import Reservation from '../models/Reservation.js';

export const createChambre = async (req, res) => {
  try {
    const { numCh, typeCh, imageCh, tarif,description, nbLits  } = req.body;
    
    const newChambre = new Chambre({
      numCh,
      typeCh,
      imageCh,
      tarif,
      description,
      nbLits,
    });

    await newChambre.save();
    res.status(201).json({ message: 'Chambre created successfully!', newChambre });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create chambre', error });
  }
};

export const getAllChambres = async (req, res) => {
  try {
    const chambres = await Chambre.find();
    res.status(200).json(chambres);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch chambres', error });
  }
};

export const getChambreById = async (req, res) => {
  try {
    const { chambreId } = req.params;

    // Find the chambre
    const chambre = await Chambre.findById(chambreId);
    if (!chambre) {
      return res.status(404).json({ message: 'Chambre not found.' });
    }

    // Find all reservations for this chambre
    const reservations = await Reservation.find({ chambreId }).select('checkInDate checkOutDate');

    // Format the reserved date ranges
    const reservedDates = reservations.map(res => ({
      checkInDate: res.checkInDate,
      checkOutDate: res.checkOutDate,
    }));

    // Send chambre with reservation date ranges
    res.status(200).json({
      chambre,
      reservedDates,
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch chambre with availability', error: error.message });
  }
};



export const updateChambre = async (req, res) => {
  try {
    const { chambreId } = req.params;
    const { numCh, typeCh, imageCh, tarif,description, nbLits } = req.body;

    const chambre = await Chambre.findById(chambreId);
    if (!chambre) {
      return res.status(404).json({ message: 'Chambre not found.' });
    }

    chambre.numCh = numCh || chambre.numCh;
    chambre.typeCh = typeCh || chambre.typeCh;
    chambre.imageCh = imageCh || chambre.imageCh;
    chambre.tarif = tarif || chambre.tarif;
    chambre.description = description || chambre.description;
      chambre.nbLits = nbLits || chambre.nbLits;
    await chambre.save();
    res.status(200).json({ message: 'Chambre updated successfully!', chambre });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update chambre', error });
  }
};

export const deleteChambre = async (req, res) => {
  try {
    const { chambreId } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(chambreId)) {
      return res.status(400).json({ message: 'Invalid chambre ID' });
    }

    const chambre = await Chambre.findById(chambreId);
    if (!chambre) {
      return res.status(404).json({ message: 'Chambre not found.' });
    }

    await Chambre.deleteOne({ _id: chambreId });

    res.status(200).json({ message: 'Chambre deleted successfully!' });
  } catch (error) {
    console.error('Delete Error:', error); // Add this line
    res.status(500).json({ message: 'Failed to delete chambre', error: error.message });
  }
};
