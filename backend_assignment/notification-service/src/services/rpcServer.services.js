const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const NOTIFICATION_SERVICE_GRPC_PORT = process.env.NOTIFICATION_SERVICE_GRPC_PORT || 50053;

const PROTO_PATH = __dirname + '/../protos/notification.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const notificationProto = grpc.loadPackageDefinition(packageDefinition).notification;

const sendNotification = (call, callback) => {
    const { userId, message } = call.request;
    console.log(`Sending notification to user ${userId}: ${message}`);
    callback(null, { success: true });
};

const startRPCServer = () => {
    const server = new grpc.Server();
    server.addService(notificationProto.NotificationService.service, { sendNotification });
    server.bindAsync(`0.0.0.0:${NOTIFICATION_SERVICE_GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) return console.error(err);
        console.log(`✅ Notification service gRPC server running on port ${port}`);
    });
};

module.exports = { startRPCServer };
