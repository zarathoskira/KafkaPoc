import kafka from './client.js';
import config from '../config/config.js';

const consumer = kafka.consumer({ groupId: 'kafka-service' });

const runConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: config.kafka.topics.order, fromBeginning: false });
  await consumer.subscribe({ topic: config.kafka.topics.cart, fromBeginning: false });
  await consumer.subscribe({ topic: config.kafka.topics.wishlist, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Consumed message', {
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });

      try {
        // Handle message processing logic here based on topic
        switch (topic) {
          case config.kafka.topics.order:
            // Handle order processing logic
            break;
          case config.kafka.topics.cart:
            // Handle cart processing logic
            break;
          case config.kafka.topics.wishlist:
            // Handle wishlist processing logic
            break;
          default:
            console.error('Unknown topic:', topic);
        }
        
        // Commit offset after successful processing
        
          await consumer.commitOffsets([{ topic, partition, offset: (parseInt(message.offset) + 1).toString() }]);
     
      } catch (error) {
        console.error('Error processing message', error);
        // Optionally handle the error, retry, etc.
      }
    },
  });
};

export default runConsumer;
