/** @format */
require("dotenv").config();

const { Kafka } = require("kafkajs");

console.log(process.env.KAFKA_HOST);
const kafka = new Kafka({
  brokers: [`${process.env.KAFKA_HOST}:9092`],
  clientId: "my-app",
});

exports.kafka = kafka;
