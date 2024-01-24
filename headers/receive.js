/** Import the amqplib library for RabbitMQ interaction */
const amqplib = require("amqplib");

/** Asynchronous function to receive data from a headers exchange in RabbitMQ. */
async function receiveData() {
	/** The name of the headers exchange */
  const exchangeName = "headersMessage";

  /**
   * Extract command line arguments for match options.
   * Options include "any", "all", etc.
   */
  const [matchOption] = process.argv.slice(2);

  /** Log the received match option to the console */
  console.log(matchOption);

  /** Connect to the RabbitMQ server running on localhost */
  const connection = await amqplib.connect("amqp://localhost:5672");

  /** Create a channel for communication with RabbitMQ */
  const channel = await connection.createChannel();

  /** Ensure that the headers exchange exists, or create it if not */
  await channel.assertExchange(exchangeName, "headers");

  /** Declare a unique and exclusive queue for this consumer */
  const assertedQueue = await channel.assertQueue("", { exclusive: true });

  /** Bind the queue to the exchange with specified match options and headers */
  channel.bindQueue(assertedQueue.queue, exchangeName, "", {
    author: "Saeed",
    runtime: "node.js",
    "x-match": matchOption,
  });

  /** Consume messages from the queue and log their content and headers */
  channel.consume(assertedQueue.queue, (msg) => {
    console.log(msg.content.toString());
    console.log(msg.properties.headers);
  });
}

/**
 * Call the receiveData function and handle any potential errors.
 */
receiveData()
	.then(() => {})
	.catch((err) => console.error(err.message));
