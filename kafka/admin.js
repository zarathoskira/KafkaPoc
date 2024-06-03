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
        numPartitions: 5,
        replicationFactor: 3,
        configEntries: [{ name: 'retention.ms', value: '86400000' }],
      },
      {
        topic: config.kafka.topics.cart,
        numPartitions: 5,
        replicationFactor: 3,
        configEntries: [{ name: 'retention.ms', value: '86400000' }],
      },
      {
        topic: config.kafka.topics.wishlist,
        numPartitions: 5,
        replicationFactor: 3,
        configEntries: [{ name: 'retention.ms', value: '86400000' }],
      },
    ];
    
    const existingTopics = await admin.listTopics();
    const topicsToBeCreated = topicsToCreate.filter(topicConfig => !existingTopics.includes(topicConfig.topic));

    if (topicsToBeCreated.length > 0) {
      await admin.createTopics({
        topics: topicsToBeCreated,
        waitForLeaders: true,
      });
      console.log('Topics created:', topicsToBeCreated.map(t => t.topic).join(', '));
    } else {
      console.log('All topics already exist.');
    }

    return "Topics creation checked";
  } catch (error) {
    console.error('Error creating topics:', error);
    return error;
  } finally {
    await admin.disconnect();
    return "Topics created";
  }
};
const createTopicsAndPartitions = async () => {
  try {
    console.log("Connecting admin...");
    await admin.connect();

    const topicsToCreate = [
      {
        topic: config.kafka.topics.order,
        numPartitions: 5,
        replicationFactor: 3,
        configEntries: [{ name: 'retention.ms', value: '86400000' }],
      },
      {
        topic: config.kafka.topics.cart,
        numPartitions: 5,
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

    for (const topicConfig of topicsToCreate) {
      const existingTopics = await admin.listTopics();
      const topicExists = existingTopics.includes(topicConfig.topic);

      if (!topicExists) {
        await admin.createTopics({
          topics: [topicConfig],
          waitForLeaders: true,
        });
        console.log(`Topic ${topicConfig.topic} created with ${topicConfig.numPartitions} partitions`);
      } else {
        console.log(`Topic ${topicConfig.topic} already exists`);
      }

      // Check if partitions need to be increased
      const topicMetadata = await admin.fetchTopicMetadata({ topics: [topicConfig.topic] });
      const currentPartitions = topicMetadata.topics[0]?.partitions.length || 0;

      if (currentPartitions < topicConfig.numPartitions) {
        await admin.createPartitions({
          topicPartitions: [
            { topic: topicConfig.topic, count: topicConfig.numPartitions }
          ]
        });
        console.log(`Partitions increased for topic ${topicConfig.topic} to ${topicConfig.numPartitions}`);
      } else {
        console.log(`Topic ${topicConfig.topic} already has ${currentPartitions} partitions`);
      }
    }

    return "Topics and partitions created";
  } catch (error) {
    console.error('Error creating topics and partitions:', error);
    return error;
  } finally {
    await admin.disconnect();
    console.log("Admin disconnected");
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
    const topicMetadata = await admin.fetchTopicMetadata({ topics: [topic] });
    const currentPartitions = topicMetadata.topics[0]?.partitions.length || 0;

    if (currentPartitions < partitions) {
      await admin.createPartitions({
        topicPartitions: [
          { topic, count: partitions }
        ]
      });
      console.log(`Partitions increased for topic ${topic} to ${partitions} partitions`);
    } else {
      console.log(`Topic ${topic} already has ${currentPartitions} partitions`);
    }
    return "PARTITION INCREASED";
  } catch (error) {
    console.error(`Error increasing partitions for topic ${topic}:`, error);
    return "PARTITION INCREASED ERROR";
  }
};

const increaseTopicsPartition = async () => {
  try {
    console.log("Connecting admin for partition increase...");
    await admin.connect();

    const topicsToIncrease = [
      { name: config.kafka.topics.order, partitions: 5 },
      { name: config.kafka.topics.cart, partitions: 5 },
      { name: config.kafka.topics.wishlist, partitions: 5 }
    ];

    for (const topicConfig of topicsToIncrease) {
      await increasePartitions(topicConfig.name, topicConfig.partitions);
    }
    return "INCREASED PARTITION";
  } catch (error) {
    console.error('Error increasing partitions:', error);
  } finally {
    await admin.disconnect();
  }
};

const checkPartitions = async () => {
  try {
    await admin.connect();
    const topics = [config.kafka.topics.order, config.kafka.topics.cart, config.kafka.topics.wishlist];
    const metadata = await admin.fetchTopicMetadata({ topics });

    metadata.topics.forEach(topic => {
      console.log(`Topic: ${topic.name}, Partitions: ${topic.partitions.length}`);
    });

    await admin.disconnect();
  } catch (error) {
    console.error('Error fetching topic metadata:', error);
  }
};

export default {
  createTopics,
  deleteTopics,
  increaseTopicsPartition,
  checkPartitions,
  createTopicsAndPartitions
};
