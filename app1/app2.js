const { Kafka } = require('kafkajs');

// Konfigurasi Kafka
const kafka = new Kafka({
  clientId: 'dt-location-12', // Unique identifier for this Kafka client
  brokers: ['ugems.id:3021'], // Kafka broker addresses
  logLevel: 5,
});

// Inisialisasi producer
const producer = kafka.producer();

// Main function to run the producer
async function run() {
  try {
    console.log("Connecting to Kafka...");
    await producer.connect();
    console.log("Connected to Kafka.");

    // Call the function to send a message
    await sendMessage();

    // console.log("Disconnecting from Kafka...");
    // await producer.disconnect();
    // console.log("Disconnected from Kafka.");
  } catch (ex) {
    console.error(`Error occurred: ${ex.message}`);
  } finally {
    process.exit(0); // Exit the process when done
  }
}

// Function to send a message to the Kafka topic
async function sendMessage() {
  try {
    // Data to send
    const data = {
      latitude: -6.200000, // Example latitude
      longitude: 106.816666, // Example longitude
      timestamp: new Date().toISOString() // Current timestamp
    };

    // Sending the message to the topic
    await producer.send({
      topic: 'dt-last-location',
      messages: [
        { value: JSON.stringify(data) } // Serialize the data to a string
      ]
    });

    console.log('Message sent successfully:', data);
  } catch (err) {
    console.error('Error sending message:', err.message);
  }
}

// Run the producer
run();
