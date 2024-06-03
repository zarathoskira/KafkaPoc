import { sendOrderMessage } from '../services/orderService.js';

const createOrder = async (req, res) => {
  try {
    const response = await sendOrderMessage(req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { createOrder };
