# RabbitMQ Exchange Types

This Node.js learning project focuses on understanding RabbitMQ exchange types,
including `direct`, `fanout`, `headers`, and `topic`. The project is organized into
separate directories for each exchange type, and each directory contains relevant
JavaScript files for sending and receiving messages.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/).
- [Docker](https://www.docker.com/).

## Setting Up RabbitMQ with Docker

To set up RabbitMQ using Docker, run the following command in your terminal:

```bash
docker run -d -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
```

This command pulls the RabbitMQ Docker image and starts a container with RabbitMQ
running. The RabbitMQ management console will be accessible at [http://localhost:15672](http://localhost:15672) (username: guest, password: guest).

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/saeedNW/rabbitmq-types.git
   ```

2. Navigate to the project directory:

   ```shell
   cd rabbitmq-types
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

4. Ensure RabbitMQ is running using Docker (as specified in the "Setting Up RabbitMQ with Docker" section).

5. Follow the instructions for testing each exchange type as described in the
   "Instructions for Testing Each Exchange Type" section.

## Instructions for Testing Each Exchange Type

### Direct Exchange

To test the direct exchange type, follow these steps:

1. Run multiply instants of the `direct/receive.js` file with specific log types:

   ```bash
   node direct/receive.js warning info

   node direct/receive.js error info

   node direct/receive.js warning warning
   ```

2. In another terminal instance, run the `direct/send.js` file with a log type and a message:

   ```bash
   node direct/send.js info "Info: Welcome to my application."

   node direct/send.js warning "Warning: Weak password."

   node direct/send.js error "Error: Can't save data in DB."
   ```

### Fanout Exchange

To test the fanout exchange type, follow these steps:

1. Run multiply instants of the `fanout/consumer.js` file to see the randomized queue names:

   ```bash
   node fanout/consumer.js
   ```

2. In another terminal instance, run the `fanout/producer.js` file:

   ```bash
   node fanout/producer.js
   ```

### Headers Exchange

To test the headers exchange type, follow these steps:

1. Run multiply instants of the `headers/receive.js` file with a specific match option:

   ```bash
   node headers/receive.js any

   node headers/receive.js all
   ```

2. In another terminal instance, run the `headers/send.js` file with a dynamic input:

   ```bash
   node headers/send.js node.js

   node headers/send.js .netcore
   ```

### Topic Exchange

To test the topic exchange type, follow these steps:

1. Run multiply instants of the `topic/receive.js` file with specific log types:

   ```bash
   node topic/receive.js "error.*.message"

   node topic/receive.js "#.message"

   node topic/receive.js "*.node.*"
   ```

2. In another terminal instance, run the `topic/send.js` file with specific log types and a message:

   ```bash
   node topic/send.js "error.nodejs.message"

   node topic/send.js "learn.backend.message"

   node topic/send.js "learn.node.message"

   node topic/send.js "learn.node.error"
   ```

**Note:** Adjust log types, messages, and other parameters based on your learning
requirements. Explore and observe the interactions between senders and receivers to
deepen your understanding of RabbitMQ exchange types.

## Contributors

We would like to thank the following individuals who have contributed to the
development of this project:

![avatar](https://images.weserv.nl/?url=https://github.com/erfanyousefi.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)
‎ ‎
‎ ![avatar](https://images.weserv.nl/?url=https://github.com/saeedNW.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)

[**Erfan Yousefi - Supervisor and instructor of the node.js programming course**](https://github.com/erfanyousefi/)

[**Saeed Norouzi - Back-end Developer**](https://github.com/saeedNW)
