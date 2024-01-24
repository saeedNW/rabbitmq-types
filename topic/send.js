/** Import the amqplib library for RabbitMQ interaction */
const amqplib = require("amqplib");

/** Asynchronous function to send data to a topic exchange in RabbitMQ. */
async function sendData() {
	/** The name of the topic exchange */
	const exchangeName = "topicMessage";

	/** Extract command line arguments for log type and message */
	const [logType, message] = process.argv.slice(2);

	/** Connect to the RabbitMQ server running on localhost */
	const connection = await amqplib.connect("amqp://localhost:5672");

	/** Create a channel for communication with RabbitMQ */
	const channel = await connection.createChannel();

	/** Ensure that the topic exchange exists, or create it if not */
	await channel.assertExchange(exchangeName, "topic");

	/** Publish a message to the topic exchange with a specific routing key (logType) */
	channel.publish(exchangeName, logType, Buffer.from(message));

	/** Set a timeout to close the connection and exit the process after a delay. */
	setTimeout(() => {
		connection.close();
		process.exit(0);
	});
}

/** Call the sendData function and handle any potential errors. */
sendData()
	.then(() => {})
	.catch((err) => console.error(err.message));
