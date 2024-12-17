const { Kafka, logLevel } = require('kafkajs');

// Kafka client setup
const kafka = new Kafka({
  clientId: 'my-consumer-app',
  brokers: ['localhost:9092'], // Replace with your broker addresses
  logLevel: logLevel.ERROR,
});

const consumer = kafka.consumer({ groupId: 'my-group' });

const run = async () => {
  // Connect the consumer
  await consumer.connect();

  // Subscribe to the topic
  await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });

  // Run the consumer
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        // Check if the message has a value
        if (!message.value) {
          throw new Error('Message has no value');
        }

        // Process the message
        console.log({
          key: message.key ? message.key.toString() : null,
          value: message.value.toString(),
          headers: message.headers,
          topic: topic,
          partition: partition,
          offset: message.offset,
        });

        // Simulate message processing error
        if (message.value.toString().includes('error')) {
          throw new Error('Simulated processing error');
        }

      } catch (error) {
        // Handle message processing errors
        console.error(`Error processing message from topic ${topic} [${partition}]:`, error);
        // You can also log the error details to a monitoring system
      }
    },
  });
};

// Error listener for consumer
consumer.on(consumer.events.CRASH, async event => {
  console.error('Consumer crashed', event.payload);
  // Optional: restart consumer or alert the system
});

consumer.on(consumer.events.CONNECT, () => {
  console.log('Consumer connected');
});

consumer.on(consumer.events.DISCONNECT, () => {
  console.log('Consumer disconnected');
});

consumer.on(consumer.events.STOP, () => {
  console.log('Consumer stopped');
});

consumer.on(consumer.events.REBALANCING, () => {
  console.log('Consumer rebalancing');
});

run().catch(e => console.error(`[example/consumer] ${e.message}`, e));
