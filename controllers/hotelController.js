import Hotel from '../models/Hotel.js';
export const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('chambres');
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('chambres');
    if (!hotel) return res.status(404).json({ message: 'Hôtel introuvable' });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) return res.status(404).json({ message: 'Hôtel introuvable' });
    const hotelData = hotel.toObject();
    if (hotelData.photo) {
      hotelData.photo = `${req.protocol}://${req.get('host')}${hotelData.photo}`;
    }
    if (hotelData.photos && Array.isArray(hotelData.photos)) {
      hotelData.photos = hotelData.photos.map(photo => 
        `${req.protocol}://${req.get('host')}${photo}`
      );
    }
    res.status(200).json(hotelData);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l’hôtel', error: err.message });
  }
};
export const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hôtel introuvable' });
    res.status(200).json({ message: 'Hôtel supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
