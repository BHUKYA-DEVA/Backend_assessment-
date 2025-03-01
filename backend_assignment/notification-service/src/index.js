const express = require('express');
const { connectRabbitMQ, consumeEvents } = require('./services/rabbitmqConfig');
const { startRPCServer } = require('./services/rpcServer.services');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Notification service is up and running')
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, async () => {
    startRPCServer();
    await connectRabbitMQ().then(() => {
        consumeEvents();
    });
    console.log(`🚀 Notification service running on port ${PORT}`);
});
