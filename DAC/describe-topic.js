const { Kafka } = require('kafkajs');
const topic = process.argv[2];

const brokerUrl = "localhost:9092";

// Kafka client setup
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [brokerUrl], // Replace with your broker addresses
});

const admin = kafka.admin();

const describeTopic = async (topicName) => {
  await admin.connect();

  try {
    const topicMetadata = await admin.fetchTopicMetadata({ topics: [topicName] });
    console.log('Topic Metadata:', `${JSON.stringify(topicMetadata)}`);
  } catch (error) {
    console.error('Failed to describe topic:', error);
  } finally {
    await admin.disconnect();
  }
};

describeTopic(topic); // Replace with your topic name
