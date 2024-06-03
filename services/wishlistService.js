import producer from '../kafka/producer.js';
import config from '../config/config.js';

const addToWishlist = async (wishlistItem) => {
  await producer.send({
    topic: config.kafka.topics.wishlist,
    messages: [{ value: JSON.stringify(wishlistItem) }],
  });

  console.log('Wishlist message sent');
  return 'Wishlist updated';
};

export { addToWishlist };
