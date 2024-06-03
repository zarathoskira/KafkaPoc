import producer from '../kafka/producer.js';
import config from '../config/config.js';

const addToCart = async (cartItem) => {
  await producer.send({
    topic: config.kafka.topics.cart,
    messages: [{ value: JSON.stringify(cartItem) }],
  });

  console.log('Cart message sent');
  return 'Cart updated';
};

export { addToCart };
