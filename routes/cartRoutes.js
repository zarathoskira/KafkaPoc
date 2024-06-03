import express from 'express';
import updateCart from '../controllers/cartController.js';

const router = express.Router();

router.post('/', updateCart);

export default router;
