const { Kafka } = require('kafkajs');
const topic = process.argv[2];

// Kafka client setup
const kafka = new Kafka({
  clientId: 'my-admin-app',
  brokers: ['localhost:9092'],
});

const admin = kafka.admin();

const deleteTopic = async (topicName) => {
  await admin.connect();

  try {
    // Delete the topic
    await admin.deleteTopics({
      topics: [topicName],
      timeout: 5000, // Optional timeout
    });
    console.log(`Topic ${topicName} deleted successfully`);
  } catch (error) {
    console.error(`Failed to delete topic ${topicName}:`, error);
  } finally {
    await admin.disconnect();
  }
};

// Replace 'my-topic' with the name of the topic you want to delete
deleteTopic(topic);
