import producer from '../kafka/producer.js';
import config from '../config/config.js';

const sendOrderMessage = async (order) => {
  await producer.send({
    topic: config.kafka.topics.order,
    messages: [{ value: JSON.stringify(order) }],
  });

  console.log('Order message sent');
  return 'Order received';
};

export { sendOrderMessage };
