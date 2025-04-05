import Avis from '../models/Avis.js';

// Create a new review (Avis)
export const createAvis = async (req, res) => {
  try {
    const { userId, hotelId, chambreId, rating, comment } = req.body;

    const newAvis = new Avis({
      userId,
      hotelId,
      chambreId,
      rating,
      comment,
    });

    await newAvis.save();
    res.status(201).json({ message: 'Review added successfully!', newAvis });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add review', error });
  }
};

// Get all reviews for a specific hotel and chambre
export const getAvisByHotelAndChambre = async (req, res) => {
  try {
    const { hotelId, chambreId } = req.params;
    const avis = await Avis.find({ hotelId, chambreId }).populate('userId', 'username email');
    
    if (!avis) {
      return res.status(404).json({ message: 'No reviews found for this hotel or chambre.' });
    }

    res.status(200).json(avis);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error });
  }
};

// Update a review (Avis)
export const updateAvis = async (req, res) => {
  try {
    const { avisId } = req.params;
    const { rating, comment } = req.body;

    const avis = await Avis.findById(avisId);
    if (!avis) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    avis.rating = rating || avis.rating;
    avis.comment = comment || avis.comment;

    await avis.save();
    res.status(200).json({ message: 'Review updated successfully!', avis });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update review', error });
  }
};

// Delete a review (Avis)
export const deleteAvis = async (req, res) => {
  try {
    const { avisId } = req.params;

    const avis = await Avis.findById(avisId);
    if (!avis) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    await avis.remove();
    res.status(200).json({ message: 'Review deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review', error });
  }
};
