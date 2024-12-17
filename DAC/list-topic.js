const { Kafka } = require('kafkajs');

const brokerUrl = "localhost:9092";

// Kafka client setup
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [brokerUrl], // Replace with your broker addresses
});

const admin = kafka.admin();

const listTopics = async () => {
  await admin.connect();

  try {
    const topics = await admin.listTopics();
    console.log('Registered Kafka Topics:', topics);
  } catch (error) {
    console.error('Failed to list Kafka topics:', error);
  } finally {
    await admin.disconnect();
  }
};

listTopics();
