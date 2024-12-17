const { Kafka } = require('kafkajs');
const msg = process.argv[2];

// const brokerUrl = "localhost:9092";
const brokerUrl = "ugems.id:3021";


// KAFKA_CLIENT_ID=dev-dac-service-consumer
// KAFKA_PORT=29092
// KAFKA_BROKER_URL=10.12.51.21
// KAFKA_NOTIFICATION_TOPIC=dev.dac.send.notification

// Setup Kafka
console.log("broker url: ", brokerUrl)
const kafka = new Kafka({
  clientId: 'my-app-200',
  brokers: [brokerUrl],
  // logLevel: 5,
});

const producer = kafka.producer();
const admin = kafka.admin();



run();

async function run(){
  try{
    console.log("Connecting.....")
    await producer.connect()
    console.log("Connected!")

    sendMessage();
  //   const result =  await producer.send({
  //     // "topic": "notification",
  //     "topic": "sicantik-notif",
  //     "messages": [
  //         {
  //             "value": msg,
  //             "partition": 0
  //         }
  //     ]
  // })
  //   console.log(`Send Successfully! ${JSON.stringify(result)}`)
    // await producer.disconnect();

    // const listTopic = await admin.listTopics();
    // console.log(listTopic);
  }
  catch(ex)
  {
      console.error(`Something bad happened ${ex}`)
  }
  // finally{
  //     process.exit(0);
  // }

};

// node app1 "message"


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

// node app1.js '{
//     "unique_id_service": "m2046rgtCT65EPJe",
//     "send_to_phone": [
//         "6282273025672",
//         "6282273025671",
//         "6282273025673"
//     ],
//     "send_to_email": [
//         "aryboby1@gmail.com",
//         "wawan.sasongko@borneo-indobara.com",
//         "aryboby3@gmail.com"
//     ],
//     "title": "Testing General",
//     "description": "Testing General",
//     "image": "https://portal.borneo-indobara.com/img/user.png",
//     "body": "Testing General",
//     "html": "<div style=\"font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #ddd;\"><h2 style=\"color: #007BFF; font-weight: bold;\">Notification</h2><p style=\"font-size: 16px; line-height: 1.6;\">This is an important <strong style=\"color: #d9534f;\">notification</strong> sent via POST request.</p></div>"
// }'



// node app1.js '
//     {
//       "judul": "VIOLATION",
//       "tanggal": "27-06-2024",
//       "lokasi": "KM 16",
//       "nomor_lambung": "LV 0002",
//       "evidence_url": "https://storage.googleapis.com/sicantik/pelanggaran/safe%20distance/2024-02-29/KM-7-KOSONGAN-BUNATI_safe%20distance_2024-02-29%2009_22_15_0.jpg"
//   }'
