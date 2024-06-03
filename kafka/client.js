import { Kafka } from 'kafkajs';
import config from '../config/config.js';

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: [config.kafka.host],
});

export default kafka;
