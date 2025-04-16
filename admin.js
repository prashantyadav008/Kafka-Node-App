/** @format */

const { kafka } = require("./client");

async function init() {
  //connet
  const admin = kafka.admin();
  console.log("connecting");

  await admin.connect();
  console.log("connected");

  await admin.createTopics({
    topics: [
      {
        topic: "driver-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("\nTopics created ------------> ");

  await admin.disconnect();
  console.log("disconnect");
}

init();
