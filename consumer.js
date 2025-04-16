/** @format */

const { kafka } = require("./client");

const group = process.argv[2];

async function init() {
  const consumer = kafka.consumer({ groupId: group });

  console.log("consumer connecting");

  await consumer.connect();
  console.log("consumer connected");

  await consumer.subscribe({
    topics: ["driver-updates"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `Group Name: ${group}, Offset: ${message.offset}: [${topic}]: PART:${partition}:`,
        message.value.toString()
      );
    },
  });
}

init();
