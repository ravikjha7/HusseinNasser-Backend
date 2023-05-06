/* RabbitMQ */
const amqp = require("amqplib");

const msg = {number: process.argv[2]}
connect();
async function connect() {

    try {
        const amqpServer = "amqps://yxoyqnyt:fUhbYtV7NpL8HwfZkOF3wAaY58WT3tOK@puffin.rmq2.cloudamqp.com/yxoyqnyt";
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)))
        console.log(`Job sent successfully ${msg.number}`);
        await channel.close();
        await connection.close();

    } catch (err) {
        console.error(err);
    }

}