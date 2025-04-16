<!-- @format -->

# 🧭 Kafka Quickstart Guide with Node.js

This project demonstrates how to use **Apache Kafka** with NodeJS using KafkaJS. It includes examples of Kafka **Producer**, **Consumer**, and **Admin** operations with Docker-based Kafka setup.

## Video Demonstration

[Watch the setup and demonstration video here](https://github.com/prashantyadav008/Kafka-Node-App/blob/kafka_setup/Working-Flow-of-Kafka-using-Nodejs.mp4)

<br>

---

## 📘 What is Kafka?

**Apache Kafka** is a **distributed event streaming platform** used to build real-time data pipelines and streaming applications. It is designed for high-throughput, fault-tolerant, and scalable messaging between services or systems.

Kafka allows systems to:

- **Send (produce)** messages/events
- **Receive (consume)** messages
- **Manage topics** and configurations via Admin APIs

---

<br>

### 🧩 Core Concepts:

#### 📤 Producer

A **Producer** is responsible for sending messages to a Kafka topic. These messages can be anything — logs, user activity, transactions, etc.

**Example**: Sending a user's location update to topic `user-location`.

---

#### 📥 Consumer

A **Consumer** reads (subscribes to) messages from a Kafka topic.
Consumers belong to a **consumer group**, and Kafka will distribute messages among consumers in the same group to balance load.

---

#### 🛠️ Admin

Kafka Admin is used for managing Kafka topics, partitions, and broker metadata programmatically.

Admin API is used to:

- Create/Delete topics
- List topics
- Get metadata

<br><hr>

## 🚀 Getting Started

Follow the steps below to set up Kafka using Docker and connect with your Node.js application.

---

## ⚙️ Step-by-Step Setup Instructions

### 1. Clone the project and prepare environment variables

```bash
cp env_example .env
```

📄 Purpose: Copies the `.env_example` file to .env. You must edit the .env file and set your machine's private IP address.

Example .env file:

```bash
PRIVATE_IP=192.168.10.15
```

🛠️ Get Private IP Address

```bash
ifconfig
```

### 2. Run Zookeeper (required for Kafka)

**Apache ZooKeeper** is used by Kafka to coordinate brokers, maintain configuration info, and manage leader election for partitions. ZooKeeper is a centralized service for maintaining configuration information, naming, providing distributed synchronization, and group services. In the context of Kafka, ZooKeeper plays a crucial role in managing and coordinating the **Kafka brokers**.

```bash
docker run -p 2181:2181 zookeeper
```

🔧 Role of ZooKeeper in Kafka:

- `Cluster Management`: Keeps track of the status of Kafka brokers (nodes) in the cluster.

- `Leader Election`: Manages the election of a controller broker responsible for administrative operations.

- `Metadata Management`: Stores metadata about topics, partitions, and their configurations.

- `Configuration Management`: Maintains configuration information for Kafka topics and brokers.

- `Access Control`: Stores Access Control Lists (ACLs) for managing permissions.

**Note**: Starting from Kafka version 2.8.0, Kafka can be run without ZooKeeper using the KRaft mode. However, ZooKeeper is still widely used in many production environments.

### 3. Run Kafka Broker

**Kafka brokers** are responsible for storing and processing messages, and they coordinate the distribution of messages between consumers and producers. And each broker can handle thousands of reads and writes per second and can manage multiple partitions of multiple topics.

```bash
docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 \
-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka
```

🛠 Responsibilities of a Kafka Broker:

- `Message Storage`: Stores messages for topics and partitions.

- `Message Serving`: Serves incoming messages to consumers.

- `Load Balancing`: Distributes messages to consumers in a consumer group.

- `Replication`: Ensures data is replicated across multiple brokers for fault tolerance.

- `Metadata Handling`: Provides metadata information to clients (producers and consumers) about the Kafka cluster.

**Example**: In a Kafka cluster with three brokers, each broker might handle different partitions of a topic, ensuring scalability and fault tolerance.

🧠 **Command Explanation**:

- `KAFKA_ZOOKEEPER_CONNECT`: Kafka connects to Zookeeper

- `KAFKA_ADVERTISED_LISTENERS`: IP/port Kafka advertises to clients

- `KAFKA_LISTENERS`: Where Kafka listens inside the container

- `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR`=1: For single-broker setups

<br><hr>

🚀 Running the Application

### 4. Install Packages and Dependencies

```bash
yarn install
```

### 5. Start Admin (creates topic, etc.)

```bash
node admin.js
```

🛠 This sets up required Kafka topics (e.g. user-location, etc.) using KafkaJS Admin API.

### 6. Run Producer

```bash
node producer.js
```

✍️ When prompted, type messages like:

- `pqrst south`
- `abcde north`

### 7. Run Consumer

```bash
node consumer.js <GROUP_NAME>
```

**Example:**

```bash
node consumer.js user-1
```

🔄 This starts a Kafka consumer in group user-1 that will continuously listen for new messages. Keep this running in a separate terminal.

You can also run multiple consumers with the same group to simulate partitioned message consumption:

```bash
node consumer.js user-1  # Reads from one partition
node consumer.js user-1  # Reads from another partition
```

Kafka will load balance messages across these consumers.
