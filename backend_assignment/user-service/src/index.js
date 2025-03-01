const express = require('express');
const mongoose = require('mongoose');
const { startRPCServer } = require('./services/rpcServer.services');
const { connectRabbitMQ } = require('./services/rabbitmqConfig');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('User service is up and running')
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
    startRPCServer();
    await connectRabbitMQ();
    console.log(`🚀 User service running on port ${PORT}`);
});
