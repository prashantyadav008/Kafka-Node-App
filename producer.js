/** @format */

const { kafka } = require("./client");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();
  console.log("producer connecting");
  await producer.connect();
  console.log("producer connected");

  readline.setPrompt(">");
  readline.prompt();

  readline
    .on("line", async (line) => {
      const [driverName, location] = line.split(" ");
      await producer.send({
        topic: "driver-updates",
        messages: [
          {
            partition: location.toLowerCase() === "north" ? 0 : 1,
            key: "update-location",
            value: JSON.stringify({ name: driverName, location: location }),
          },
        ],
      });
    })
    .on("close", async () => {
      await producer.disconnect();
      console.log("consumer disconnected");
    });
}

init();
