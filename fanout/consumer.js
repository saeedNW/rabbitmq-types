/** Import the amqplib library for RabbitMQ interaction */
const amqplib = require("amqplib");

/** Define an asynchronous function to receive messages from a fanout exchange */
async function receiveMsg() {
	/** Specify the name of the fanout exchange */
	const exchangeName = "logs";

	/** Connect to the RabbitMQ server running on localhost */
	const connection = await amqplib.connect("amqp://localhost:5672");

	/** Create a channel for communication with RabbitMQ */
	const channel = await connection.createChannel();

	/** Ensure that the fanout exchange exists, or create it if not */
	await channel.assertExchange(exchangeName, "fanout");

	/** Declare a unique and exclusive queue for this consumer */
	const assertedQueue = await channel.assertQueue("", { exclusive: true });

	/** Log the name of the declared queue */
	console.log("queue name:", assertedQueue.queue);

	/** Bind the queue to the fanout exchange with an empty routing key */
	channel.bindQueue(assertedQueue.queue, exchangeName, "");

	/** Consume messages from the queue */
	channel.consume(assertedQueue.queue, (msg) => {
		/** Check if the message has content */
		if (msg.content) {
			/** Log the content of the received message */
			console.log(msg.content.toString());

			/** Acknowledge (ack) the message to notify RabbitMQ that it has been processed */
			channel.ack(msg);
		}
	});
}

/** Call the receiveMsg function and handle any potential errors */
receiveMsg()
	.then(() => {})
	.catch((err) => console.error(err.message));
