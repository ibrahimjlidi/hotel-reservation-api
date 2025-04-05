
import Hotel from '../models/Hotel.js';

// ✅ Create a new hotel
export const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all hotels
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('chambres');
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get hotel by ID
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('chambres');
    if (!hotel) return res.status(404).json({ message: 'Hôtel introuvable' });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update hotel
export const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) return res.status(404).json({ message: 'Hôtel introuvable' });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete hotel
export const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hôtel introuvable' });
    res.status(200).json({ message: 'Hôtel supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
