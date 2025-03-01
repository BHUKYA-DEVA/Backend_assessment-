const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue('user.follow');
        await channel.assertQueue('user.unfollow');
    } catch (error) {
        console.error('❗ Failed to connect to RabbitMQ:', error);
        process.exit(1);
    }
};

const getChannel = () => channel;

module.exports = {
    connectRabbitMQ,
    getChannel
};
