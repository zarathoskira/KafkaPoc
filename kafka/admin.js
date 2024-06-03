import kafka from './client.js';
import config from '../config/config.js';

const admin = kafka.admin();

const createTopics = async () => {
  try {
    console.log("Connecting admin...");
    await admin.connect();

    const topicsToCreate = [
      {
        topic: config.kafka.topics.order,
        numPartitions: 2,
        replicationFactor: 3,
        configEntries: [{ name: 'retention.ms', value: '86400000' }],
      },
      {
        topic: config.kafka.topics.cart,
        numPartitions: 2,
        replicationFactor: 3,
        configEntries: [{ name: 'retention.ms', value: '86400000' }],
      },
      {
        topic: config.kafka.topics.wishlist,
        numPartitions: 2,
        replicationFactor: 3,
        configEntries: [{ name: 'retention.ms', value: '86400000' }],
      },
    ];

    await admin.createTopics({
      topics: topicsToCreate,
      waitForLeaders: true,
    });
    console.log('Topics created');
    return "Topics created"
  } catch (error) {
    console.error('Error creating topics:', error);
    return error
  } finally {
    await admin.disconnect();
    return "Topics created"
  }
};

const deleteTopics = async () => {
  try {
    await admin.connect();
    console.log('Admin connected');

    const topicsToDelete = [
      config.kafka.topics.order,
      config.kafka.topics.cart,
      config.kafka.topics.wishlist
    ];

    await admin.deleteTopics({
      topics: topicsToDelete,
      timeout: 5000,
    });

    console.log(`Topics deleted: ${topicsToDelete.join(', ')}`);
  } catch (error) {
    console.error('Error deleting topics:', error);
  } finally {
    await admin.disconnect();
  }
};

const increasePartitions = async (topic, partitions) => {
  try {
    await admin.connect();
    console.log('Admin connected');

    await admin.createPartitions({
      topicPartitions: [
        { topic, count: partitions }
      ]
    });

    console.log(`Partitions increased for topic ${topic} to ${partitions} partitions`);
    return "PARTITION INCREASED"
  } catch (error) {
    console.error(`Error increasing partitions for topic ${topic}:`, error);
    return "PARTITION INCREASED ERROR"
  } finally {
    await admin.disconnect();
    return "PARTITION INCREASED"
  }
};

const increaseTopicsPartition = async () => {
  try {
    const topicsToIncrease = [
      { name: config.kafka.topics.order, partitions: 5 },
      { name: config.kafka.topics.cart, partitions: 5 },
      { name: config.kafka.topics.wishlist, partitions: 5 }
    ];

    for (const topicConfig of topicsToIncrease) {
      await increasePartitions(topicConfig.name, topicConfig.partitions);
    }
    return "INCREASED PARTITION"
  } catch (error) {
    console.error('Error increasing partitions:', error);
  }
};

export default {
  admin, createTopics,
  deleteTopics,
  increaseTopicsPartition
};
