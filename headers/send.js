/** Import the amqplib library for RabbitMQ interaction */
const amqplib = require("amqplib");

/** Asynchronous function to send data to a headers exchange in RabbitMQ. */
async function sendData() {
	/** The name of the headers exchange */
	const exchangeName = "headersMessage";

	/** Extract command line arguments for dynamic input */
	const [dynamicInput] = process.argv.slice(2);

	/** Log the received dynamic input to the console */
	console.log(dynamicInput);

	/** Connect to the RabbitMQ server running on localhost */
	const connection = await amqplib.connect("amqp://localhost:5672");

	/** Create a channel for communication with RabbitMQ */
	const channel = await connection.createChannel();

	/** Ensure that the headers exchange exists, or create it if not */
	await channel.assertExchange(exchangeName, "headers");

	/** Publish a message to the headers exchange with specified headers */
	channel.publish(exchangeName, "", Buffer.from("any message"), {
		headers: {
			author: "Saeed",
			runtime: dynamicInput,
			price: 50000,
			comments: [],
		},
	});

	/**
	 * Set a timeout to close the connection and exit the process after a delay.
	 * Adjust the delay time as needed based on the requirements.
	 */
	setTimeout(() => {
		connection.close();
		process.exit(0);
	}, 1000); // Set the delay time in milliseconds
}

/**
 * Call the sendData function and handle any potential errors.
 */
sendData()
	.then(() => {})
	.catch((err) => console.error(err.message));
