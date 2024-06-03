
import kafka from './client.js';

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
  console.log('Producer is ready');
};

run().catch(console.error);

export default producer;