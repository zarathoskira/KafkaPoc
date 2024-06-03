import express from 'express';
import runConsumer from './kafka/consumer.js';
import producer from './kafka/producer.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import config from './config/config.js';
// import admin from "./kafka/admin.js"
const app = express();
const port = config.express.port;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/order', orderRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishlistRoutes);
// Kafka consumer and producer initialization
(async () => {
  await producer.connect();
  await runConsumer();
})();

// Start the server
app.listen(port, () => {
  console.log(`Shopping management service listening at http://localhost:${port}`);
});
