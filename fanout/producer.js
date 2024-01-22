/** Import the amqplib library for RabbitMQ interaction */
const amqplib = require("amqplib");

/** Define an asynchronous function to send a message to a fanout exchange */
async function sendMsg() {
	/** Specify the name of the fanout exchange */
	const exchangeName = "logs";

	/** Connect to the RabbitMQ server running on localhost */
	const connection = await amqplib.connect("amqp://localhost:5672");

	/** Create a channel for communication with RabbitMQ */
	const channel = await connection.createChannel();

	/** Ensure that the fanout exchange exists, or create it if not */
	await channel.assertExchange(exchangeName, "fanout");

	/** Publish a message to the fanout exchange with an empty routing key */
	channel.publish(exchangeName, "", Buffer.from("message from fanout"));

	/** Set a timeout to close the connection and exit the process after a delay */
	setTimeout(() => {
		connection.close();
		process.exit(0);
	});
}

/** Call the sendMsg function and handle any potential errors */
sendMsg()
	.then(() => {})
	.catch((err) => console.error(err.message));
