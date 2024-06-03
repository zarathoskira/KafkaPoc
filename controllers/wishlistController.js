import { addToWishlist } from '../services/wishlistService.js';

const addItemToWishlist = async (req, res) => {
  try {
    const response = await addToWishlist(req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { addItemToWishlist };
