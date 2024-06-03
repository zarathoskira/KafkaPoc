import express from 'express';
import { addItemToWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

router.post('/', addItemToWishlist);

export default router;
