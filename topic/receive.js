/** Import the amqplib library for RabbitMQ interaction */
const amqplib = require("amqplib");

/** Asynchronous function to receive data from a topic exchange in RabbitMQ. */
async function receiveData() {
	/** The name of the topic exchange */
	const exchangeName = "topicMessage";

	/**
	 * Extract command line arguments for log types.
	 * [*.*.*, #.anything, foo.bar.*, foo.bar.#]
	 */
	const logTypes = process.argv.slice(2);

	/** Log the received log types to the console */
	console.log(logTypes);

	/** Connect to the RabbitMQ server running on localhost */
	const connection = await amqplib.connect("amqp://localhost:5672");

	/** Create a channel for communication with RabbitMQ */
	const channel = await connection.createChannel();

	/** Ensure that the topic exchange exists, or create it if not */
	await channel.assertExchange(exchangeName, "topic");

	/** Declare a unique and exclusive queue for this consumer */
	const assertedQueue = await channel.assertQueue("", { exclusive: true });

	/** Bind the queue to the exchange with specified log type patterns */
	for (const pattern of logTypes) {
		channel.bindQueue(assertedQueue.queue, exchangeName, pattern);
	}

	/** Consume messages from the queue and log their content */
	channel.consume(assertedQueue.queue, (msg) => {
		console.log(msg.content.toString());
	});
}

/**
 * Call the receiveData function and handle any potential errors.
 */
receiveData()
	.then(() => {})
	.catch((err) => console.error(err.message));
