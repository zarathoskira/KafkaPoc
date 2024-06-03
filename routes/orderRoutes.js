import express from 'express';
import { createOrder } from '../controllers/orderController.js'
import admin from '../kafka/admin.js';
const router = express.Router();

router.post('/', createOrder);
router.post('/createTopics', admin.createTopics);
router.post('/deleteTopics', admin.deleteTopics);
router.post('/increaseTopicsPartition', admin.increaseTopicsPartition);

export default router;
    