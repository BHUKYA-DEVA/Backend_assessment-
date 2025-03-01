const amqp = require('amqplib');
const notificationController = require('../controllers/notification.controller');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://rabbitmq';

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue('user.follow');
        await channel.assertQueue('user.unfollow');
        await channel.assertQueue('discussion.create');
        await channel.assertQueue('discussion.update');
        await channel.assertQueue('discussion.delete');
        await channel.assertQueue('discussion.like');
        await channel.assertQueue('discussion.comment');
        await channel.assertQueue('discussion.reply');
        await channel.assertQueue('discussion.likeComment');
    } catch (error) {
        console.error('❗ Failed to connect to RabbitMQ:', error);
        process.exit(1);
    }
};

const getChannel = () => channel;

const consumeEvents = () => {
    channel.consume('user.follow', msg => {
        const data = JSON.parse(msg.content.toString());
        notificationController.handleUserFollow(data);
        channel.ack(msg);
    });

    channel.consume('user.unfollow', msg => {
        const data = JSON.parse(msg.content.toString());
        notificationController.handleUserUnfollow(data);
        channel.ack(msg);
    });

    channel.consume('discussion.create', msg => {
        const data = JSON.parse(msg.content.toString());
        notificationController.handleDiscussionCreate(data);
        channel.ack(msg);
    });

    channel.consume('discussion.update', msg => {
        const data = JSON.parse(msg.content.toString());
        notificationController.handleDiscussionUpdate(data);
        channel.ack(msg);
    });

    channel.consume('discussion.delete', msg => {
        const data = JSON.parse(msg.content.toString());
        notificationController.handleDiscussionDelete(data);
        channel.ack(msg);
    });

    channel.consume('discussion.like', msg => {
        const data = JSON.parse(msg.content.toString());
        notificationController.handleDiscussionLike(data);
        channel.ack(msg);
    });

    channel.consume('discussion.comment', msg => {
        const data = JSON.parse(msg.content.toString());
        notificationController.handleDiscussionComment(data);
        channel.ack(msg);
    });

    channel.consume('discussion.reply', msg => {
        const data = JSON.parse(msg.content.toString());
        notificationController.handleDiscussionReply(data);
        channel.ack(msg);
    });

    channel.consume('discussion.likeComment', msg => {
        const data = JSON.parse(msg.content.toString());
        notificationController.handleDiscussionLikeComment(data);
        channel.ack(msg);
    });
};

module.exports = {
    connectRabbitMQ,
    getChannel,
    consumeEvents
};
