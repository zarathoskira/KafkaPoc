import { addToCart } from '../services/cartService.js';

const updateCart = async (req, res) => {
  try {
    const cartItem = req.body;
    const result = await addToCart(cartItem);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default updateCart
